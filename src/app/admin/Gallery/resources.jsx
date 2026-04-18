import React from 'react'
import { Link } from 'react-router-dom'
import { Download, Image, ShoppingBag, Package } from 'lucide-react'

function Resources() {
    const links = [
        {
            title: "Downloads",
            description: "Manage downloadable resources and files",
            icon: Download,
            link: "/admin/resources/downloads",
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            title: "Products",
            description: "Manage your store products inventory",
            icon: Package,
            link: "/admin/resources/products",
            color: "text-amber-500",
            bgColor: "bg-amber-50"
        },
        {
            title: "Orders",
            description: "Track and manage store orders",
            icon: ShoppingBag,
            link: "/admin/resources/orders",
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        },
        {
            title: "Gallery",
            description: "Manage photo galleries and media",
            icon: Image,
            link: "/admin/resources/gallery",
            color: "text-emerald-500",
            bgColor: "bg-emerald-50"
        }
    ]

    return (
        <div className="h-full w-full p-4 md:p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
                <p className="text-gray-500 mt-1">Quick navigation for resources submenus</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {links.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <Link
                            key={index}
                            to={item.link}
                            className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 ease-in-out cursor-pointer"
                        >
                            <div className={`p-4 rounded-full ${item.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                                <Icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-center text-gray-500">{item.description}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Resources