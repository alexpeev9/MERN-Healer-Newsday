import ListArticle from '../article/List';

const Home = () => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/images/HealerFull.png'} alt="logo" /> */}
            <ListArticle />
            <div className="container">
                <div className="row">
                    <section className="col-sm-12 maincontent">
                        <h3>Information about our site:</h3>
                        <p>Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <h3>What you should know about:</h3>
                        <p>Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;