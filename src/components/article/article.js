import { Constants } from '../../constants';
import styles from './article.module.scss';
import Moment from 'react-moment';

const Article = ({ card }) => {
    // console.log(card)
    const imageBlob = card?.multimedia?.find(item =>
        (item.subtype === Constants.MULTIMEDIA_480 || item.subtype === Constants.MULTIMEDIA_495) && item.url
    );
    const imageUrl = imageBlob?.url ? Constants.HOST + '/' + imageBlob?.url : Constants.DEFAULT_IMAGE;
    return (
        <div className={styles.wrapper}>
            <div className={styles.imgWrapper}>
                <img className={styles.image} src={imageUrl} alt={card.news_desk} />
            </div>
            <div className={styles.textWrapper}>
                <h4>{card?.headline?.print_headline || card?.headline?.main}</h4>
                <Moment format={Constants.TIME_FORMAT}>{card.pub_date}</Moment>
                <div className={styles.source}>{card.news_desk}</div>
            </div>
        </div>
    )
}

export default Article;