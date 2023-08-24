import { ReactNode, isValidElement } from 'react';
import SharedLayout from '@/components/SharedLayout';

export default function ProfilePageLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (isValidElement(children)) {
    const userId: string = children.props.segmentPath[3][1];
    return (
      <>
        <SharedLayout userId={userId} />
        {children}
      </>
    );
  }
}
