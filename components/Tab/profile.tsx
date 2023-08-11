

import { UserModel } from './../../model/UserModel';
import {useState, useEffect} from 'react'


export default function Profile({user}:{user:UserModel}) {
    const [state, setstate] = useState<UserModel>({} as UserModel);

    useEffect(() => {
    
        setstate(user)
       
      }, [user])
      const updateProfile =() => {

        console.log(state)
      }
    return (
    <form onChange={updateProfile}>
      <div className="space-y-12">
        <div className=" border-gray-900/10">         
          <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7">Mes données personnelles</h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
           
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
              <input type="password" value={state.password} onChange={ (e) => setstate({...state, password: e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
          </div> */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                Nom
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={state.name}
                  onChange={ (e) => setstate({...state, name: e.target.value})}
                  autoComplete="given-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  value={state.username}
                  onChange={ (e) => setstate({...state, username: e.target.value})}
                  id="last-name"
                  autoComplete="family-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={ (e) => setstate({...state, email: e.target.value})}
                  type="email"
                  autoComplete="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                Pays
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6"
                >
                  <option>France</option>
                  <option>Maroc</option>
                  {/* <option>Mexico</option> */}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="street-address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                addresse
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white leading-6">
                    Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                <span>Séléctionner une image</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
                    </div>
                </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enregistrer
        </button>
      </div>
    </form>
  )
}
