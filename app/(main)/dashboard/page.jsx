import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='px-5'>
      {/* Budget Progress */}

      {/* Overview */}

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed w-96 h-30">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full">
              <Plus className="h-5 w-5 mb-1" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>

    </div>
  )
}

export default DashboardPage