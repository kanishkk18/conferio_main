'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, 
         DialogContent, 
         DialogDescription, 
         DialogFooter, 
         DialogHeader, 
         DialogTitle, 
         DialogTrigger } from "../ui/dialog"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import ColorPicker from "./color-picker/color-picker"
import EmojiPicker from 'emoji-picker-react'
// import './color-picker/color-picker.css'
import Loading from "../common/loading"
import { Plus } from "lucide-react"
import Category from "interfaces/category";

const isColorLight = (hexColor: string) => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminosity > 128;
};

interface CategoryFormProps {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export function CategoryForm({ setCategories }: CategoryFormProps) {
  const [name, setName] = useState("Sports");
  const [color, setColor] = useState("#000000");
  const [icon, setIcon] = useState("⚽");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const textColor = isColorLight(color) ? "text-black" : "text-white";

  const handleNewCategory = async () => {
    setIsDialogOpen(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify({ name, color, icon }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newCategory = await response.json();

        setCategories((prevCategories) => [
          ...(prevCategories || []),
          newCategory,
        ]);
      }
    } catch (error) {
      console.error("Error creating new category:", error);
    }
    setIsLoading(false);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    setIcon(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div>
      <Loading isLoading={isLoading} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild >
          <Button
            variant="outline"
            className="bg-transparent mx-auto border border-primary text-white"
          >
            <Plus />
            New Project
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[430px] -ml-1.5">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Create your new Project here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 px-8">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                required
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <ColorPicker
                id="color"
                value={color}
                onChange={handleColorChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="icon"
                  value={icon}
                  readOnly
                  placeholder="Select an emoji"
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  Pick Emoji
                </Button>
              </div>
            </div>
            {showEmojiPicker && (
              <div className="mt-2">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              className={`${textColor}`}
              style={{ backgroundColor: color }}
              type="submit"
              onClick={handleNewCategory}
            >
              {icon} Save category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
