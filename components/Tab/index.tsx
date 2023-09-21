'use client'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
  import { useState, useCallback, useEffect } from 'react';

  import { useSearchParams, usePathname, useRouter } from 'next/navigation';
  import { UserModel } from './../../model/UserModel';
  import { FavorisModel } from './../../model/FavorisModel';
  // import useAuth from './../../hooks/useAuth'

  import {AuthUserContext} from './../../hooks/auth.context'
import { useContext } from "react";
import axios from './../../lib/axios'
import GeneralCard from "./../Cards/generale";


  import Profile from './profile'
export default function ProfileTabs(){
  // const [state, setstate] = useState({email: "", password: "", name:"", phone: ""})

  const searchParams = useSearchParams()!
  const pathname = usePathname()
  const router = useRouter()

  // const  {user, token, logout, login }: {user: UserModel, token: any, logout: any, login: any} = useAuth();

  const { state, dispatch } = useContext(AuthUserContext);


  const [activeTab, setActiveTab] = useState(searchParams.get("value")? searchParams.get("value") : "profil" );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const handleLoogout = () => { 
    dispatch({type: "LOGOUT", user: {} as UserModel});
    router.push('/')
  }
 
  useEffect(() => {
    
    setActiveTab(searchParams.get("value"))
    return () => {
      
    }
  }, [searchParams.get("value")])


const data = [
  {
    label: "Mon profile",
    value: "profil",
    desc: <div> 
        <h2> Mon profil </h2>

        <div className="ltn-author-introducing clearfix">
              <div className="author-img">
              <img src={"/images/ic_profile.png"} alt="Author Image" />
              </div>
              <div className="author-info">
              {/* <h6>Agent of Property</h6> */}
              <h2> {`${state.user.name} ${state.user.username}`} </h2>
              <div className="footer-address">
                <ul>
                <li>
                  <div className="footer-address-icon">
                  <i className="icon-placeholder" />
                  </div>
                  <div className="footer-address-info">
                  <p>{state.user.email}</p>
                  </div>
                </li>
               
                </ul>
                <button onClick={handleLoogout} className="logout"> Se déconnecter </button>
              </div>
              </div>
            </div>
         
              <Profile user={state.user} />
       </div>,
  },
  {
    label: "Magasin Favoris",
    value: "favoris",
    desc: <MagasinFavoris />,
  },
  // {
  //   label: "Catalogue favoris",
  //   value: "catalogue",
  //   desc: <CatalogueFavoris />,
  // },
  // {
  //   label: "Changer le mot de passe",
  //   value: "password",
  //   desc: `Because it's about motivating the doers. Because I'm here
  //   to follow my dreams and inspire other people to follow their dreams, too.`,
  // },
  // {
  //   label: "Notifications",
  //   value: "notification",
  //   desc: <Notification /> ,
  // },
];

    return(
        <Tabs className="dark:text-gray-100" value={activeTab} orientation="vertical">
        <TabsHeader className="bg-transparent lg:w-72"
        indicatorProps={{
          className: "bg-blue-500/10 shadow-none text-blue-500",
        }}>
          {data.map(({ label, value }) => (
            <Tab className="ltn__tab-menu-list" onClick={() => { router.push(pathname + "?" + createQueryString("value", value)); setActiveTab(value)}} key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="dark:text-gray-100">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="py-0 dark:text-gray-100">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      
    )
}

function MagasinFavoris() {
  const [favoris, setFavoris] = useState<FavorisModel[]>([] as FavorisModel[]);
  const { state, dispatch } = useContext(AuthUserContext);

  useEffect( () => {
    
    axios.get('/api/user-favorite-magasin?country_id=1', { headers: { Authorization: "Bearer " + state.token } }).then(res => {
      console.log(res.data.data)
      setFavoris(res.data.data)
    }).catch((err) => {
      // console.log(err)
    })
}, [] );


  return(
    <div>
        { favoris?.map((fav, index) => {
          return(
            <GeneralCard key={index} title={" " + fav.name} showReadMore={true} readMoreLink={`/magasins/${fav.slug}`} catalogs={fav.bookList}  />

          )
        })

        }
    </div>
  )
}

function CatalogueFavoris() {
  const [favoris, setFavoris] = useState();
  const { state, dispatch } = useContext(AuthUserContext);

  useEffect( () => {
    
    axios.get('/api/user-wishlist-book?country_id=1', { headers: { Authorization: "Bearer " + state.token } }).then(res => {
      console.log(res)
      setFavoris(res.data)
    })
}, [] );


  return(
    <div>
      
    </div>
  )
}

function Notification(){

  return(

    <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">
      We&apos;ll always let you know about important changes, but you pick what else you want to hear about.
    </p>

    <div className="mt-10 space-y-10">
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
        <div className="mt-6 space-y-6">
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                Comments
              </label>
              <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
            </div>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="candidates" className="font-medium text-gray-900">
                Candidates
              </label>
              <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
            </div>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="offers"
                name="offers"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="offers" className="font-medium text-gray-900">
                Offers
              </label>
              <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-x-3">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
              Everything
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="push-email"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
              Same as email
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="push-nothing"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
              No push notifications
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
  )
}