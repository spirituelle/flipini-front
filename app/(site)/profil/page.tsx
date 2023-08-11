import Image from 'next/image'
import  Link  from 'next/link';
import Tabs from "./../../../components/Tab"
import Breadcrumb from './../../../components/Breadcrumb';

export default function ProfilePage() {
 
    return (
      <div className="md:container">
        <Breadcrumb containerClassName=""  />

        <Tabs />
      </div>
     
    )
  }
  