import Footer from "../components/footer";
import MainContainer from "../components/mainContainer";
import Navbar from "../components/navbar";

export type Props = { name: 'next' }
export const HomePage: React.FC<Props> = ({  }) => {
    return (
        <div>
            <Navbar />
            <MainContainer />
            <Footer />
        </div>
    )
};

export default HomePage;