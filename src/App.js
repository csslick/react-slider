import { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
// import { FaQuoteRight } from 'react-icons/fa';
import './App.css';
import data from './data';

function App() {
  const [customers, setCustomers] = useState(data);
  const [index, setIndex] = useState(0)
  // console.log(customers[index])

  // useEffect(()=> {
  //   if(index < 0) {
  //     setIndex(customers.length-1);
  //   }
  //   if(index > customers.length-1) {
  //     setIndex(0);
  //   }
  // }, [index])
  const prevSlide = () => {
    setIndex(oldIndex => {
      if(oldIndex <= 0) {
        return oldIndex = customers.length-1;
      }
      return oldIndex - 1;
    })
  }

  const nextSlide = () => {
    setIndex(oldIndex => {
      console.log(oldIndex)
      if(oldIndex >= customers.length-1) {
        return 0;
      }
      return oldIndex + 1;
    })
  }

  useEffect(() => {
    /* prev, next 버튼을 누르면 hook에서 index값 업데이트시 인터벌 함수가 
      중첩 실행 되는 것을 방지하기 위해 마지막에 인터벌을 초기화하는 루틴 필요
    */
    const slider = setInterval(()=> {
      setIndex((oldIndex)=>{
        if(oldIndex >= customers.length-1) {
          oldIndex = 0;
          return oldIndex;
        }
        return oldIndex + 1;
      });
    }, 3000)
    return () => {
      return clearInterval(slider);
    }
  }, [index])

  return (
    <section className="review">
      <h2>사용자 리뷰</h2>
      <div className="sliders">
        {
          customers.map((customer, sliderIndex) => {
            // 다음 슬라이드(기본)
            let position = 'nextSlide';

            // 현재 슬라이드
            if(sliderIndex === index) {
              position = 'activeSlide';
            }
            
            // 지난 슬라이드(시작 지점인 경우 마지막 이미지를 전에 배치)
            if(sliderIndex === index - 1 || 
              (index === 0 && sliderIndex === customers.length-1)) {
              position = 'lastSlide';
            }
            return (
              <article key={customer.id} className={"slider " + position}>
                <img src={customer.image} alt={customer.title} className='customer-img' />
                <h4>{customer.name}</h4>
                <p className="title">{customer.title}</p>
                <p className="text">{customer.quote}</p>
              </article>
            )
          })
        }
        <button className="prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
