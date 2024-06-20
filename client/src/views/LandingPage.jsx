import axios from "axios";
import { useEffect, useRef, useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import io from "socket.io-client";
import { SocketContext } from '../context/Context';

const socket = io('http://localhost:3000');

export default function LandingPage() {
    const { me, callAccepted, name, setName, callUser, answerCall, setMe} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const navigate = useNavigate()
    // Statenya dipake di sini doank
    // Padahal harusnya dipake di halaman yang MainPage !
    const [call, setCall] = useState({});
  
    useEffect(() => {
        console.log(callAccepted, 'callAccepted');
        //false 'callAccepted'
        console.log(me, 'me');
        //me
        // then, it show => CI9Yqg9y35ZwAo2HAANk me
        console.log(name, 'name');
        // name
        console.log(setName, 'setName');
        //ƒ dispatchSetState(fiber, queue, action) {
          // {
              //  if (typeof arguments[3] === "function") {
                 // error("State updates from the useState() and useReducer() Hooks don't support … 
        console.log(callUser, 'callUser');
        
        console.log(answerCall, 'answerCall');
        console.log(setMe, 'setMe');

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            // Jadinya ini ga bisa kepake ke sebelah !
            setCall({ isReceivingCall: true, from, name: callerName, signal });
          });
    }, [me, name])


    return(
        <>
            <div className="bg-white text-gray-900 noto-sans">
                <div className="flex">
                    <main className="w-1/2 flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
                        <div className="w-full justify-start">
                            <h1 className="text-6xl font-semibold mb-4">Video calls and meetings for everyone</h1>
                            <p className="text-gray-700 mb-6">Connect, collaborate, and celebrate from anywhere with Google Meet</p>
                        </div>
                        
                        <div className="lg:flex lg:items-center lgspace-x-4 mb-4 sm:block sm:w-full">
                            {/* <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2">
                                <span>New meeting</span>
                            </button> */}
                            <button
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 lg:w-auto sm:w-full w-full"
                                onClick={() => navigator.clipboard.writeText(me)}
                            >
                                Copy Meeting ID
                            </button>
                            <div>
                                <input 
                                    id="filled-basic"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter name"
                                    className="border border-gray-300 rounded-lg py-2 px-4 lg:w-auto sm:w-full w-full"/>
                                <input 
                                    id="filled-basic"
                                    type="text"
                                    value={idToCall}
                                    onChange={(e) => setIdToCall(e.target.value)}
                                    placeholder="Enter a code or link"
                                    className="border border-gray-300 rounded-lg py-2 px-4 lg:w-auto sm:w-full w-full"/>
                            </div>
                            
                            <button
                                onClick={() => {
                                    callUser(idToCall), navigate("/meet")
                                }}
                                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 lg:w-auto sm:w-full w-full">
                                    Join</button>
                        </div>
                        <p className="text-gray-600">
                            {/* <a href="#" className="text-blue-600">Learn more</a> about Google Meet */}
                            <>
                            {call.isReceivingCall && !callAccepted ? (
                                <>
                                    {call.name}  is calling...
                                    <button onClick={() => {
                                        answerCall(),
                                        navigate("/meet")
                                    }} style={{ padding: "10px", backgroundColor: "blue", color: "white" }}>
                                        Answer
                                    </button>
                                </>
                            ) : null}
                            </>
                        </p>
                    </main>
                    <main className="flex items-center justify-center h-screen text-center p-4">
                        <div className="flex justify-center w-full">
                            <img className="lg:w-72 md:w-52 sm:w-28 w-14"
                                src="https://www.gstatic.com/meet/premium_carousel_03_4f42ed34b9d0637ce38be87ecd8d1ca0.gif" alt=""/>
                            <img className="lg:w-72 md:w-52 sm:w-28 w-14"
                                src="https://www.gstatic.com/meet/premium_carousel_02_174e55774263506d1280ce6552233189.gif" alt=""/>
                        </div>
                    </main>
                </div>
            </div> 
        </>
    )
}