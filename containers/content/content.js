import styles from './content.module.scss';
import fetch from 'isomorphic-unfetch';
import { useEffect, useRef, useState, useCallback } from 'react';
import Article from '../../components/article/article';
import { Constants } from '../../constants';
import _ from 'lodash';

const Content = () => {
    const domRef = useRef();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let page = 0;
    useEffect(() => {
        function scrollEventhandler() {
            if (domRef.current.scrollTop + domRef.current.clientHeight >= domRef.current.scrollHeight - 20) {
                loadMoreItems();
            }
        }
        domRef.current.addEventListener("scroll", scrollEventhandler);
        getArticle();
        return () => domRef.current.removeEventListener("scroll", scrollEventhandler)
    }, [])
    
    const getArticle = async () => {
        const url = `${Constants.API_HOST}/svc/search/v2/articlesearch.json?q=general&page=${page}&api-key=${Constants.API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setIsLoading(false);
        page++;
        setItems(prev => [...prev, ...data.response.docs]);
    }

    const debounceLoadData = useCallback(_.debounce(getArticle, 1000), []);
    
    const displayItems = () => {
        return items.map(item => (
            <li key={item._id}><Article card={item} /></li>
        ))
    }
    const loadMoreItems = () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        debounceLoadData()
    }
    return (
        <div ref={domRef} className={styles.wrapper}>
            <ul className={styles.cardWrapper}>
                {displayItems()}
            </ul>
            {isLoading ? <p className="loading">{Constants.MORE_LABEL}</p> : ""}
        </div>
    )
}

export default Content;