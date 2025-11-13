import { redirect } from 'next/navigation';

export default function ProductIndexPage() {
  redirect('/shop/all-jewellery');
  return null;
}

