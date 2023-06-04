import { useEffect, useRef, useState } from 'react';
import './App.scss';
import Home from './pages/Home/Home';
import Loading from './components/Loading'
import toast, { Toaster } from 'react-hot-toast'
import NotFound from './components/NotFound';

export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'

function App() {
  const [myData, setMyData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [cityInfo, setCityInfo] = useState();
  const [loading, setLoading] = useState(false);
  const search = useRef(null);
  const [toastData, setToastData] = useState({});
  const [notFound, setNotFound] = useState(false);



  function conversion(temp) {
    return (temp - 273).toFixed(1);
  }

  const apiKey = "8463e429d684cb2237f4b51838552950";

  async function fetchData() {
    try {
      setLoading(true)

      const response = await fetch(`
        https://api.openweathermap.org/data/2.5/forecast?q=${search.current.value===""?'delhi':search.current.value}&APPID=${apiKey}`);
      const data = await response.json();

      if (data.cod === '404') {

        setNotFound(true)
        setToastData({
          type: TOAST_FAILURE,
          message: "City not found"
        })
        // fetchData()
        return;
      }

      const hour = new Date().getHours();
      setCityInfo(data.city)


      var temp = [];
      var index = 0;
      for (var i = 0; i < 5; i++) {
        var tempDate = data?.list[index]?.dt_txt?.slice(8, 10);

        while (hour > data?.list[index]?.dt_txt.slice(11, 13) && tempDate === data.list[index].dt_txt.slice(8, 10) && i === 0) {
          index++;

        }
        data.list[index].main.temp = conversion(data.list[index].main.temp)
        data.list[index].main.feels_like = conversion(data.list[index].main.feels_like)

        temp.push(data.list[index])

        while (tempDate === data.list[index].dt_txt.slice(8, 10)) {
          index++;
        }

      }

      setMyData(temp)
      setTodayData(temp.slice(0, 1));
      setNotFound(false)
      setToastData({
        type: TOAST_SUCCESS,
        message: "Weather loaded"
      })

    } catch (e) {



      return Promise.reject(e);




    } finally {
      setTimeout(() => {
        setLoading(false)

      },500);
    }

  }
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
      default:

    }
  }, [toastData])




  return (<>
    <Toaster
    />

    <div className="app container">
      <div style={{zIndex:"99"}} className="search center">
        <input spellCheck='false' onKeyUp={e => e.key === "Enter" ? fetchData() : null} ref={search} placeholder='Search city' type="text" />
        <i className="uil2 uil-search btn" onClick={fetchData}></i>
      </div>
      {
        loading ?
          <Loading /> :
          notFound ? <NotFound/>:
          <Home cityInfo={cityInfo} todayData={todayData} myData={myData} />
      }


    </div>
  </>);
}

export default App;
