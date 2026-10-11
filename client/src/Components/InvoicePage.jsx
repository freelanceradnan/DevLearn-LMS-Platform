import { Download, Globe, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const InvoicePage = () => {
    const location=useLocation()
    const invoiceRef=useRef()
    const data=location.state
    const [invoiceData,setInvoiceData]=useState({
    courseId:"",
    email:"",
    name:"",
    orderId:"",
    price:""
    })
    //getting order data
    useEffect(()=>{
    if(data){
    setInvoiceData({
    courseId:data.data.courseId,
    email:data.data.email,
    name:data.data.name,
    orderId:data.data.orderId,
    price:data.data.price
    })
    }
    },[data])
    
    
    //download 
    const handleDownload=async()=>{
            const element = invoiceRef.current;
            try {
                 const canvas = await html2canvas(element, { 
                scale: 2, 
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false 
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`Invoice_${invoiceData.name}_${invoiceData.orderId}.pdf`);
            } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to generate PDF.");
            }
    }
    return (
       <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
            
            {/* Action Bar (Preview only, not part of PDF) */}
            <div className="max-w-[850px] mx-auto mb-6 flex justify-between items-center p-5 rounded-xl border" 
                 style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>Invoice Preview</h2>
                    <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Order ID: {`#ORD-${invoiceData.orderId.slice(-8)}`}
                    </p>
                </div>
                <button 
                    onClick={handleDownload} 
                    className="flex items-center gap-2 text-white px-6 py-2.5 rounded-lg transition-all"
                    style={{ backgroundColor: '#0f172a', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                    <Download size={16} /> Download PDF
                </button>
            </div>

            {/* PDF Content Area */}
            <div 
                ref={invoiceRef} 
                className="max-w-[850px] mx-auto overflow-hidden relative" 
                style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            >
                {/* Top Border Accent */}
                <div style={{ height: '8px', backgroundColor: '#0f172a' }} />
                
                <div className="p-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <span style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a' }}>DevLearn</span>
                            <div className="mt-4 space-y-1">
                                
                                <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }} className="flex items-center gap-2">
                                    <Globe size={12} /> www.devlearn.com
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Invoice Reference</p>
                            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{`#ORD-${invoiceData.orderId.slice(-8)}`}</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
  {new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })}
</p>
                        </div>
                    </div>

                    {/* Billing Info */}
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
                            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>Bill To:</p>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' }}>{invoiceData.name}</h4>
                            
                            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginTop: '16px', textTransform: 'uppercase' }} className="flex items-center gap-2">
                                <Mail size={12}/> {invoiceData.email}
                            </p>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Payment Status</p>
                            <p style={{ fontSize: '14px', fontWeight: '900', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Paid Online</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                                <tr>
                                    <th style={{ padding: '16px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>Items</th>
                                    <th style={{ padding: '16px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'right' }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '24px 16px' }}>
                                        <div className="flex flex-wrap gap-2">
                                           <div  style={{ 
                                                    backgroundColor: '#f1f5f9', 
                                                    color: '#475569', 
                                                    fontSize: '10px', 
                                                    fontWeight: 'bold', 
                                                    padding: '4px 12px', 
                                                    borderRadius: '4px', 
                                                    border: '1px solid #e2e8f0' 
                                                }}> {invoiceData.courseId} </div>
                                           
                                            
                                        </div>
                                    </td>
                                    <td style={{ padding: '24px 16px', textAlign: 'right', fontWeight: 'bold', color: '#475569' }}>
                                        ${invoiceData.price}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Summary */}
                    <div className="mt-12 flex justify-between items-start">
                        <div className="w-1/2 p-5 rounded-xl" style={{ border: '1px dashed #cbd5e1' }}>
                            <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase' }}>
                                This is a system generated digital receipt. No signature is required.
                            </p>
                        </div>
                        <div className="w-[280px]">
                            <div className="flex justify-between" style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                                <span>Subtotal</span>
                                <span style={{ color: '#0f172a' }}>${invoiceData.price}</span>
                            </div>
                         
                            <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '20px', borderRadius: '12px' }}>
                                <div className="flex justify-between items-center">
                                    <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', opacity: '0.7' }}>Total Amount</span>
                                    <span style={{ fontSize: '24px', fontWeight: '900' }}>${invoiceData.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default InvoicePage;