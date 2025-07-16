"use client"

import React, { useState } from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'

const CreateAccountDrawer = ({children}) => {
    const [open, setOpen] = useState(false);

  return (
    <div>
        <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
        </DrawerContent>
        </Drawer>
    </div>
  )
}

export default CreateAccountDrawer