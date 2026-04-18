import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderPending from '@/components/admincomp/StoreComp/OrderPending';
import OrderConfirmed from '@/components/admincomp/StoreComp/OrderConfirmed';
import OrderCancelled from '@/components/admincomp/StoreComp/OrderCancelled';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAllOrders } from '@/hooks/tanstackHooks/useOrder';
import { format } from 'date-fns';
import { excelDownload } from '@/lib/ExcelDownload';
import { Loader2 } from 'lucide-react';
import { HiMiniArrowDownTray } from 'react-icons/hi2';

const Orders = () => {
const navigate = useNavigate()
const { data, isLoading, refetch } = useAllOrders("pending");

const handleDl = async () => {
  try {
    // Always refetch to get fresh data
    const { data: freshData } = await refetch();
    
    const orders = freshData?.orders || data?.orders || [];
    
    if (!orders || orders.length === 0) {
      alert('No orders found with status: pending');
      return;
    }
    
    const flattenedOrders = orders.map(order => ({
      _id: order._id,
      "Buyer Name": order.buyerId?.name || 'N/A',
      Email: order.buyerId?.email || 'N/A',
      Phone: order.buyerId?.phoneNumber || 'N/A',
      Place: order.buyerId?.place || 'N/A',
      Pincode: order.buyerId?.pincode || 'N/A',
      District: order.buyerId?.district || 'N/A',
      State: order.buyerId?.state || 'N/A',
      "Center Head": order.buyerId?.centerHead || 'N/A',
      AtcId: order.buyerId?.atcId || 'N/A',
      Date: format(new Date(order.createdAt), 'PPP'),
      "Product Name": order.productId?.name || 'N/A',
      "Product Price": order.productId?.price || 0,
      Quantity: order.quantity,
      Total: (order.productId?.price || 0) * order.quantity,
    }));
    
    excelDownload(flattenedOrders, `Pending_Orders_${new Date().toISOString().split('T')[0]}`);
    
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download orders. Please try again.');
  }
};

  return (
    <div>
      <div className="w-full  flex justify-between max-sm:flex-col gap-2 items-center border-b pb-4">
        <h1 className="text-xl md:text-2xl font-bold">Manage Orders</h1>
        <div className='space-x-2'>
          <Button onClick={handleDl} variant='outline' > {isLoading ? <Loader2 className='animate-spin'/> : <>Excel <HiMiniArrowDownTray /></>} </Button>
          <Button onClick={()=>navigate('/admin/resources/products')}>All Products</Button>
        </div>
      </div>
      <Tabs defaultValue="Active" className="w-full mt-5">
        <TabsList className="h-11 space-x-2 bg-transparent">
          <TabsTrigger
            className="bg-zinc-100 px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Active"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            className="bg-zinc-100 px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="schedule"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            className="bg-zinc-100 px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Closed"
          >
            Canceled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Active">
          <OrderPending  /> 
        </TabsContent>
        <TabsContent value="schedule">
          <OrderConfirmed />
        </TabsContent>
        <TabsContent value="Closed">
          <OrderCancelled />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Orders
