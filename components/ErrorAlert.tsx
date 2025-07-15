import { X } from "lucide-react";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "store/store";
import { AxiosResponse } from "axios";
import {
  geteventListQueryFn,
  loginMutationFn,
  registerMutationFn,
} from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ErrorAlertProps {
  isError: boolean;
  error: Error | null;
}

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;
type FormMode = "signin" | "signup";

export const ErrorAlert: React.FC<ErrorAlertProps> = () => {
  const [showError, setShowError] = useState(false);
  const [mode, setMode] = useState<FormMode>("signin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const modalTriggerRef = useRef<HTMLButtonElement | null>(null);

  const { user, setUser, setAccessToken, setExpiresAt } = useStore();

  const { isPending: isFetchingEvents, isError, error } = useQuery({
    queryKey: ["event_list"],
    queryFn: geteventListQueryFn,
  });

  // const events = data?.data.events || [];
  // const username = data?.data.username ?? "";
  const router = useRouter();

  const mutation = useMutation<AxiosResponse>({
    mutationFn: (mode === "signin" ? loginMutationFn : registerMutationFn) as any,
});


  const form = useForm<SignInFormValues | SignUpFormValues>({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
    mode: "onChange",
    defaultValues:
      mode === "signin"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "" },
  });

  const onSubmit = (values: any) => {
    if (isFetchingEvents) return;

    mutation.mutate(values, {
      onSuccess: (data: any) => {
        if (mode === "signin") {
          const { user, accessToken, expiresAt } = data;
          setUser(user);
          setAccessToken(accessToken);
          setExpiresAt(expiresAt);
          toast.success("Login successfully");
          setIsModalOpen(false);
          router.push("/event_type/page");
        } else {
          toast.success("Registered successfully");
          setIsModalOpen(false);
          router.push("/event_type/page");
        }
      },
      onError: (error: any) => {
        toast.error(error.message || `Failed to ${mode}`);
      },
    });
  };

  useEffect(() => {
    if (!user) {
      setIsModalOpen(true);
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      setIsModalOpen(true); // Auto-open modal when error happens
    }
  }, [isError]);

  if (!showError || !error) return null;

  return (
    <div className="">
      {/* Error Alert */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-3">
          <span>
            {error.message || "An unexpected error occurred. Please try again."}
          </span>
          <button
            onClick={() => setShowError(false)}
            className="hover:bg-red-600 rounded-full p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal for Login / Signup */}
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        {!isModalOpen && (
          <ModalTrigger>
           <div className="hidden"></div>
          </ModalTrigger>
        )}

        <ModalBody>
          
          <ModalContent>
            <Tabs
              defaultValue="signin"
              onValueChange={(val) => setMode(val as FormMode)}
            >
              <TabsList>
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label>Email</Label>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label>Password</Label>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? <Loader size="sm" /> : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup" className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label>Email</Label>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label>Name</Label>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label>Password</Label>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? <Loader size="sm" /> : "Sign Up"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </ModalContent>

          <ModalFooter className="gap-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="default">Book Now</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};


// import { X } from "lucide-react";
// import { z } from "zod";
// import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";

// import { cn } from "@/lib/utils";
// import { useStore } from "store/store";
// import {
//   geteventListQueryFn,
//   loginMutationFn,
//   registerMutationFn,
// } from "@/lib/api";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader } from "@/components/loader";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalTrigger,
// } from "@/components/ui/animated-modal";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface ErrorAlertProps {
//   isError: boolean;
//   error: Error | null;
// }

// const signUpSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address."),
//   password: z.string().min(6, "Password must be at least 6 characters."),
// });

// const signInSchema = z.object({
//   email: z.string().email("Please enter a valid email address."),
//   password: z.string().min(1, "Password is required"),
// });

// type SignUpFormValues = z.infer<typeof signUpSchema>;
// type SignInFormValues = z.infer<typeof signInSchema>;
// type FormMode = "signin" | "signup";

// export const ErrorAlert = ({ isError, error }: ErrorAlertProps) => {
//   const [showError, setShowError] = useState(false);
//   const [mode, setMode] = useState<FormMode>("signin");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
// const [checkedAuthOnce, setCheckedAuthOnce] = useState(false);
//   const { user, setUser, setAccessToken, setExpiresAt } = useStore();

//   const { isPending: isFetchingEvents } = useQuery({
//     queryKey: ["event_list"],
//     queryFn: geteventListQueryFn,
//   });

//   const router = useRouter();

//   const mutation = useMutation({
//     mutationFn: mode === "signin" ? loginMutationFn : registerMutationFn,
//   });

//   const form = useForm<SignInFormValues | SignUpFormValues>({
//     resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
//     mode: "onChange",
//     defaultValues:
//       mode === "signin"
//         ? { email: "", password: "" }
//         : { name: "", email: "", password: "" },
//   });

//   const onSubmit = (values: any) => {
//     if (isFetchingEvents) return;

//     mutation.mutate(values, {
//       onSuccess: (data: any) => {
//         if (mode === "signin") {
//           const { user, accessToken, expiresAt } = data;
//           setUser(user);
//           setAccessToken(accessToken);
//           setExpiresAt(expiresAt);
//           toast.success("Login successfully");
//           setIsModalOpen(false);
//           router.push("/event_type/page");
//         } else {
//           toast.success("Registered successfully");
//           setIsModalOpen(false);
//           router.push("/event_type/page");
//         }
//       },
//       onError: (error: any) => {
//         toast.error(error.message || `Failed to ${mode}`);
//       },
//     });
//   };

//  useEffect(() => {
//   if (!checkedAuthOnce) {
//     if (!user) {
//       setIsModalOpen(true);
//     }
//     setCheckedAuthOnce(true);
//   }
// }, [user, checkedAuthOnce]);

//   useEffect(() => {
//     if (isError && error) {
//       setShowError(true);
//       setIsModalOpen(true);
//     }
//   }, [isError, error]);

//   useEffect(() => {
//     if (!isModalOpen) {
//       form.reset();
//       mutation.reset();
//     }
//   }, [isModalOpen, form, mutation]);

//   if (!showError || !error) return null;

//   return (
//     <div className="">
//       {/* Error Alert */}
//       {showError && error && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
//           <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-3">
//             <span>
//               {error.message || "An unexpected error occurred. Please try again."}
//             </span>
//             <button
//               onClick={() => setShowError(false)}
//               className="hover:bg-red-600 rounded-full p-1"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modal for Login / Signup */}
//       <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <ModalBody>
//           <ModalContent>
//             <Tabs
//               defaultValue={mode}
//               onValueChange={(val) => setMode(val as FormMode)}
//             >
//               <TabsList>
//                 <TabsTrigger value="signin">Sign In</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//               </TabsList>

//               <TabsContent value="signin" className="pt-6">
//                 <Form {...form}>
//                   <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     <FormField
//                       name="email"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Email</Label>
//                           <FormControl>
//                             <Input {...field} type="email" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="password"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Password</Label>
//                           <FormControl>
//                             <Input {...field} type="password" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" disabled={mutation.isPending}>
//                       {mutation.isPending ? <Loader size="sm" /> : "Login"}
//                     </Button>
//                   </form>
//                 </Form>
//               </TabsContent>

//               <TabsContent value="signup" className="pt-6">
//                 <Form {...form}>
//                   <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     <FormField
//                       name="email"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Email</Label>
//                           <FormControl>
//                             <Input {...field} type="email" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="name"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Name</Label>
//                           <FormControl>
//                             <Input {...field} type="text" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="password"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Password</Label>
//                           <FormControl>
//                             <Input {...field} type="password" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" disabled={mutation.isPending}>
//                       {mutation.isPending ? <Loader size="sm" /> : "Sign Up"}
//                     </Button>
//                   </form>
//                 </Form>
//               </TabsContent>
//             </Tabs>
//           </ModalContent>

//           <ModalFooter className="gap-4">
//             <Button variant="outline" onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// import { X } from "lucide-react";
// import { z } from "zod";
// import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// import { cn } from "@/lib/utils";
// import { useStore } from "store/store";
// import {
//   geteventListQueryFn,
//   loginMutationFn,
//   registerMutationFn,
// } from "@/lib/api";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader } from "@/components/loader";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
// } from "@/components/ui/animated-modal";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface ErrorAlertProps {
//   isError: boolean;
//   error: Error | null;
// }

// const signUpSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address."),
//   password: z.string().min(6, "Password must be at least 6 characters."),
// });

// const signInSchema = z.object({
//   email: z.string().email("Please enter a valid email address."),
//   password: z.string().min(1, "Password is required"),
// });

// type SignUpFormValues = z.infer<typeof signUpSchema>;
// type SignInFormValues = z.infer<typeof signInSchema>;
// type FormMode = "signin" | "signup";

// export const ErrorAlert = ({ isError, error }: ErrorAlertProps) => {
//   const [showError, setShowError] = useState(false);
//   const [mode, setMode] = useState<FormMode>("signin");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
//   const queryClient = useQueryClient();

//   const { user, setUser, setAccessToken, setExpiresAt } = useStore();

//   const { isPending: isFetchingEvents } = useQuery({
//     queryKey: ["event_list"],
//     queryFn: geteventListQueryFn,
//   });

//   const router = useRouter();

//   const mutation = useMutation({
//     mutationFn: mode === "signin" ? loginMutationFn : registerMutationFn,
//   });

//   const form = useForm<SignInFormValues | SignUpFormValues>({
//     resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
//     mode: "onChange",
//     defaultValues:
//       mode === "signin"
//         ? { email: "", password: "" }
//         : { name: "", email: "", password: "" },
//   });

//   const onSubmit = (values: any) => {
//     if (isFetchingEvents) return;

//     mutation.mutate(values, {
//       onSuccess: (data: any) => {
//         if (mode === "signin") {
//           const { user, accessToken, expiresAt } = data;
//           setUser(user);
//           setAccessToken(accessToken);
//           setExpiresAt(expiresAt);
//           toast.success("Login successfully");
          
//           // Close modal and then navigate
//           setIsModalOpen(false);
          
//           // Refresh queries before navigating
//           queryClient.refetchQueries().then(() => {
//             router.push("/event_type/page");
//           });
//         } else {
//           const { user, accessToken, expiresAt } = data;
//           setUser(user);
//           setAccessToken(accessToken);
//           setExpiresAt(expiresAt);
//           toast.success("Registered successfully");
          
//           setIsModalOpen(false);
//           queryClient.refetchQueries().then(() => {
//             router.push("/event_type/page");
//           });
//         }
//       },
//       onError: (error: any) => {
//         toast.error(error.message || `Failed to ${mode}`);
//       },
//     });
//   };

//   // useEffect(() => {
//   //   if (!user) {
//   //     setIsModalOpen(true);
//   //   }
//   // }, [user]);

//   useEffect(() => {
//     if (isError && error) {
//       setShowError(true);
//       setIsModalOpen(true);
//     }
//   }, [isError, error]);

//   useEffect(() => {
//     if (!isModalOpen) {
//       form.reset();
//       mutation.reset();
//     }
//   }, [isModalOpen, form, mutation]);

//   if (!showError || !error) return null;

//   return (
//     <div className="">
//       {/* Error Alert */}
//       {showError && error && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
//           <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-3">
//             <span>
//               {error.message || "An unexpected error occurred. Please try again."}
//             </span>
//             <button
//               onClick={() => setShowError(false)}
//               className="hover:bg-red-600 rounded-full p-1"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modal for Login / Signup */}
//       <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <ModalBody>
//           <ModalContent>
//             <Tabs
//               defaultValue={mode}
//               onValueChange={(val) => setMode(val as FormMode)}
//             >
//               <TabsList>
//                 <TabsTrigger value="signin">Sign In</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//               </TabsList>

//               <TabsContent value="signin" className="pt-6">
//                 <Form {...form}>
//                   <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     <FormField
//                       name="email"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Email</Label>
//                           <FormControl>
//                             <Input {...field} type="email" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="password"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Password</Label>
//                           <FormControl>
//                             <Input {...field} type="password" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" disabled={mutation.isPending}>
//                       {mutation.isPending ? <Loader size="sm" /> : "Login"}
//                     </Button>
//                   </form>
//                 </Form>
//               </TabsContent>

//               <TabsContent value="signup" className="pt-6">
//                 <Form {...form}>
//                   <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     <FormField
//                       name="email"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Email</Label>
//                           <FormControl>
//                             <Input {...field} type="email" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="name"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Name</Label>
//                           <FormControl>
//                             <Input {...field} type="text" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="password"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem>
//                           <Label>Password</Label>
//                           <FormControl>
//                             <Input {...field} type="password" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" disabled={mutation.isPending}>
//                       {mutation.isPending ? <Loader size="sm" /> : "Sign Up"}
//                     </Button>
//                   </form>
//                 </Form>
//               </TabsContent>
//             </Tabs>
//           </ModalContent>

//           <ModalFooter className="gap-4">
//             <Button variant="outline" onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };