
import Header from './../../components/header'

export default async function SiteLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div >
        <Header />
        
        <main id="main">
          {children}
        </main>
      </div>
    );
  }