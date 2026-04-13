'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice, State } from '@/app/lib/actions'; // Import State type
import { useActionState } from 'react'; // 1. Import useActionState

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  // 2. Define the initial state for the form
  const initialState: State = { message: null, errors: {} };
  
  // 3. Bind the ID to the action
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  // 4. Use useActionState to wrap the action
  // state: current state returned by the action
  // formAction: the function you'll pass to the form's action prop
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    // 5. Use the formAction from the hook
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* ... Rest of your form inputs stay the same ... */}

        {/* Example: You can now display the error message if you want */}
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
        
        {/* ... Customer, Amount, Status fields ... */}
        {/* (Same as your previous code) */}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}