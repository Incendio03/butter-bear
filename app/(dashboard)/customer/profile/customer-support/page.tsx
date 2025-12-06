import { CustomerSupportForm } from "@/components/profile/customer-support-form";

export default function CustomerSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Support</h1>
        <p className="text-muted-foreground mt-2">
          Contact us with any questions or issues you may have
        </p>
      </div>
      <CustomerSupportForm />
    </div>
  );
}
