import Article from '../Article/List';

const Home = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/images/HealerFull.png'} alt="logo" />
            <Article />
        </>
    );
}

export default Home;