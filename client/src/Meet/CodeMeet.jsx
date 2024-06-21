import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useRoom } from "./RoomProvider";
function CodeMeet() {
  const navigate = useNavigate();
  //   const { fetchedKodeRuang, setFetchedKodeRuang } = useRoom();
  const [kodeRuang, setKodeRuang] = useState("");
  let class_id = localStorage.getItem("class_id");

  const submitCode = (e) => {
    e.preventDefault();
    // if (kodeRuang === fetchedKodeRuang) {
    navigate(`/room/${kodeRuang}`);
    // } else {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Kode ruang yang dimasukkan salah.",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
  };

  //   const getById = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_DUMMY}/api/instructur/class/${class_id}`,
  //         authConfig
  //       );
  //       const data = response.data.data;
  //       console.log(response.data.data);
  //       setFetchedKodeRuang(data.kode_ruang);
  //       setKodeRuang(data.kode_ruang);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getById();
  //   }, []);
  return (
    <>
      {/* <div className="flex flex-col h-screen"> */}
      {/* <Navbar /> */}
      <div className=" h-screen">
        <div className="md:flex block justify-around mt-12">
          <div className="md:mt-32 mt-5 md:w-[40%]">
            <h1 className="text-4xl text-left font-semibold mb-3">
              Rapat dan panggilan video untuk semua orang
            </h1>
            <p className="text-xl text-gray-500 text-left mb-5">
              Terhubung, berkolaborasi dengan g2 meet
            </p>
            <form onSubmit={submitCode} className="flex gap-2">
              <input
                className="border border-blue-300 rounded"
                placeholder="Masukan kode ruang"
                type="text"
                value={kodeRuang}
                onChange={(e) => setKodeRuang(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 p-3 text-white rounded">
                Gabung
              </button>
            </form>
          </div>
          <img
            className="md:w-[40%] w-[90%] md:mt-5 mt-0"
            src="https://cdni.iconscout.com/illustration/premium/thumb/video-call-4393629-3646089.png"
            alt=""
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default CodeMeet;
