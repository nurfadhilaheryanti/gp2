import { Link } from "react-router-dom"

export default function TouchDown() {

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen">
                <div className="block">
                    <img className="mb-5 w-42" src="https://storage.googleapis.com/googwebreview.appspot.com/grow-ext-cloud-images-uploads/7uffzv9dk4sn-3dAGxdfnn2dy6LPNvOTYRx-8be390cd801f65e46a67dec3941d7c86-Google_Meet_Logo_x2_5E4DE7D1.svg" alt="" />
                    <h1 className="mb-5 text-6xl font-semibold text-zinc-800">Video calls with anyone, anywhere</h1>
                    <h2 className="mb-5 text-xl text-gray-700">Keep communicating and collaborating with friends, family, and colleagues wherever you are.</h2>
                    <div>
                        <Link to='/login'><button className="rounded-sm px-5 py-3 bg-blue-500 text-lg text-white hover:bg-blue-800">Sign in</button></Link>
                        <Link to='/register'><button style={{ border: "solid 1px #D3D3D3" }} className="rounded-sm px-5 py-3 text-blue-500 ml-5">Try Meet to work</button></Link>
                    </div>

                </div>
                <div>
                    <img className="w-2/3" src="https://lh3.googleusercontent.com/ymE-oI_G6XpO7K6hL4asEjjhdRl23BOB-ytyvZ6ExQ-Mhkzp9AgMiQsQXU8Vzsjk3H3syNRdv-Qy_3Q_mkxsj0IzxG7ESJvW0AXEig=e365-pa-nu-rw-w1416" alt="" />
                </div>
            </div>
        </>
    )
}