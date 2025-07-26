// import Link from 'next/link';
import Settingheader from './header';

// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
import Availability from '@/components/availability';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Security from './security';
import Integrations from 'pages/integrations/page';
import { Teams } from '@/components/team';
// import type { NextPageWithLayout } from 'types/next';
import type {
  GetServerSidePropsContext,
  // InferGetServerSidePropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSession } from '@/lib/session';
import { getUserBySession } from 'models/user';
import { UpdateAccount } from '@/components/account';
import env from '@/lib/env';

// type AccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

//  const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getSession(context.req, context.res);
//   const user = await getUserBySession(session);
//   const { locale } = context;

//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         image: user.image,
//       },
//       allowEmailChange: env.confirmEmail === false,
//     },
//   };
// };

export default function Dashboard({
  user,
  allowEmailChange,
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Settingheader />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 dark:bg-[#141414] p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-7xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <Tabs
          defaultValue="account"
          className="mx-auto grid w-full max-w-9xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[300px_1fr]"
        >
          <TabsList
            className="grid gap-4 text-sm  text-start bg-transparent text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <TabsTrigger value="account" className='text-start'>Account</TabsTrigger>
            <TabsTrigger value="Security" className='text-start'>Security</TabsTrigger>
            <TabsTrigger value="Teams">Teams</TabsTrigger>
            <TabsTrigger value="Integration">Integrations</TabsTrigger>
            <TabsTrigger value="Availability">Availability</TabsTrigger>
            {/* <TabsTrigger value="Support">Support</TabsTrigger> */}
          </TabsList>
          <div className="grid gap-6">
            <TabsContent value="account">
            {/* <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card> */}


<UpdateAccount user={user} allowEmailChange={allowEmailChange} />
            </TabsContent>
            <TabsContent value="Security">
             <Security sessionStrategy="jwt"/>
            </TabsContent>
            <TabsContent value="Availability">
             <Availability />
            </TabsContent>
            <TabsContent value="Integration">
             <Integrations/>
            </TabsContent>
             <TabsContent value="Teams">
             <Teams />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
