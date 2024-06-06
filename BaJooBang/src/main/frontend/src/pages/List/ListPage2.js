import React, { useState, useEffect } from 'react';
import './ListPage1.css'; // 페이지 스타일을 여기에 유지합니다.
import ListBlock2 from './ListBlock2';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListPage2() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 10;

    /*
    const listData = [
        { Num: '1', Address: '서울특별시 서초구 서초동', Price: '2000/130', Date: '2024.03.29', request: '0', State: '매칭 전' },
        { Num: '2', Address: '서울특별시 강남구 역삼동', Price: '1000/50', Date: '2024.03.28', request: '1', State: '매칭 전' },
        { Num: '3', Address: '서울특별시 강동구 천호동', Price: '100/23', Date: '2024.03.24', request: '4', State: '매칭 완료' },
        { Num: '4', Address: '서울특별시 강서구 화곡동', Price: '2000/130', Date: '2024.03.22', request: '2', State: '매칭 전' },
        { Num: '5', Address: '서울특별시 마포구 합정동', Price: '300/30', Date: '2024.03.21', request: '3', State: '매칭 완료' },
        { Num: '6', Address: '서울특별시 용산구 이태원동', Price: '100/10', Date: '2024.03.20', request: '1', State: '매칭 전' },
        { Num: '7', Address: '서울특별시 성동구 성수동', Price: '500/50', Date: '2024.03.19', request: '0', State: '평가 완료' },
        { Num: '8', Address: '서울특별시 종로구 혜화동', Price: '400/40', Date: '2024.03.18', request: '2', State: '매칭 완료' },
        { Num: '9', Address: '서울특별시 서대문구 홍제동', Price: '700/70', Date: '2024.03.17', request: '4', State: '평가 완료' },
        { Num: '10', Address: '서울특별시 동작구 상도동', Price: '1000/100', Date: '2024.03.16', request: '3', State: '매칭 전' },
        { Num: '11', Address: '서울특별시 송파구 잠실동', Price: '200/20', Date: '2024.03.15', request: '2', State: '매칭 완료' },
        { Num: '12', Address: '서울특별시 강남구 청담동', Price: '1500/150', Date: '2024.03.14', request: '1', State: '매칭 전' },
        { Num: '13', Address: '서울특별시 영등포구 여의도동', Price: '2500/250', Date: '2024.03.13', request: '0', State: '매칭 전' },
    ];
    */

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/member/registered'); // Replace with your actual API endpoint
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Price: item.price,
                    State: item.state,
                    Date: item.date,
                    Request_id: item.request_id,
                }));
                setListData(requestData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(listData.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, listData]);

    const paginate = (pageNumber, event) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className='ListBackground'>
            <div className='ListBox'>
                <div className='ListTitle' style={{backgroundColor: 'rgba(162, 197, 121, 0.3)'}}>
                   <div className='ListTitleText2'>번호</div> 
                   <div className='ListTitleText2_address' style={{fontWeight: '500'}}>매물 주소</div>
                   <div className='ListTitleText2'>거래 가격</div>
                   <div className='ListTitleText2'>상태</div>
                   <div className='ListTitleText2'>요청서</div>
                   <div className='ListTitleText2'>등록일</div>
                </div>
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <Link to='/matching' className='ListLinkNotLine'>
                            <ListBlock2 Num={item.Num} Address={item.Address} Price={item.Price} State={item.State} Date={item.Date} Request_id={item.Request_id} />
                        </Link>
                        <div className='ListLine' />
                    </React.Fragment>
                ))}
            </div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={(event) => paginate(number, event)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default ListPage2;
