import { Link } from 'react-router';
import notfound from '../../assets/notfound.svg';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
    return (
        <div className="text-center mt-20">
            <img src={notfound} alt="404" className="w-1/4 mx-auto" />
            <h1 className="text-4xl font-bold">Something went wrong</h1>
            <p className="text-xl mt-4">Sorry we were unable to find this page</p>
            <Link to="/">
                <Button className="mt-4">Back to home</Button>
            </Link>
        </div>
    );
}
