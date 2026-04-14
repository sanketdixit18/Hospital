// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, CreditCard, Shield, Check } from "lucide-react";
// import { PricingTable } from "@clerk/nextjs";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import Pricing from "@/components/pricing";

// export default async function PricingPage() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       {/* Header Section */}
//       <div className="flex justify-start mb-2">
//         <Link
//           href="/"
//           className="flex items-center text-muted-foreground hover:text-white transition-colors"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Home
//         </Link>
//       </div>

//       <div className="max-w-full mx-auto mb-12 text-center">
//         <Badge
//           variant="outline"
//           className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
//         >
//           Affordable Healthcare
//         </Badge>

//         <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
//           Simple, Transparent Pricing
//         </h1>

//         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//           Choose the perfect consultation package that fits your healthcare
//           needs with no hidden fees or long-term commitments
//         </p>
//       </div>

//       {/* Pricing Table Section */}
//       <Pricing />

//       {/* FAQ Section - Optional */}
//       <div className="max-w-3xl mx-auto mt-16 text-center">
//         <h2 className="text-2xl font-bold text-white mb-2">
//           Questions? We're Here to Help
//         </h2>
//         <p className="text-muted-foreground mb-4">
//           Contact our support team at support@medimeet.com
//         </p>
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { ArrowLeft, CreditCard, Shield, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-start mb-4">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Title */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Badge
          variant="outline"
          className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
        >
          Doctor Credit System
        </Badge>

        <h1 className="text-4xl font-bold gradient-title mb-4">
          Earn Credits. Get Paid.
        </h1>

        <p className="text-muted-foreground">
          Doctors earn credits for every completed consultation.
          Credits can be withdrawn as real money.
        </p>
      </div>

      {/* Custom Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <CreditCard className="h-8 w-8 mx-auto mb-4 text-emerald-400" />
            <h3 className="text-xl font-semibold mb-2">
              Earn Credits
            </h3>
            <p className="text-muted-foreground">
              Doctors earn <strong>100 credits</strong> for every completed
              appointment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Check className="h-8 w-8 mx-auto mb-4 text-emerald-400" />
            <h3 className="text-xl font-semibold mb-2">
              Transparent Value
            </h3>
            <p className="text-muted-foreground">
              <strong>100 credits = ₹100</strong>. No hidden fees.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-4 text-emerald-400" />
            <h3 className="text-xl font-semibold mb-2">
              Secure Payouts
            </h3>
            <p className="text-muted-foreground">
              Withdraw credits anytime after admin approval.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center mt-16">
        <p className="text-muted-foreground">
          Questions? Contact us at <strong>support@medimeet.com</strong>
        </p>
      </div>
    </div>
  );
}
