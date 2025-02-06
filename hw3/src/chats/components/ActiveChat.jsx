import { useAuth } from '../../auth/context';

export default function ActiveChatComponent() {
    const client = useAuth();

    return <>
        <div className="col-11">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
        </div>
        <div className="col-1">
            <button type="submit" className="btn btn-primary mb-3">Send</button>
        </div>
    </>
}