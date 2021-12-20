import ListArticle from '../articlei/List';

const Home = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/images/HealerFull.png'} alt="logo" />
            <ListArticle />
        </>
    );
}

export default Home;