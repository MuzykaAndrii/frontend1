import { useAuth } from '../../auth/context';
import MessageComponent from './Message';

export default function ActiveChatComponent() {
    const client = useAuth();



    return <>

        <div className="chatHistory flex-grow-1 overflow-auto p-3">
            <MessageComponent message={'some msg'} sent_at={"20:51"} from_user_username={"user"} from_user_id={1} />
            {/* <MessageComponent message={'some msg'} sent_at={"20:51"} from_user_username={"user"} from_user_id={1} />
            <MessageComponent message={'some msg'} sent_at={"20:51"} from_user_username={"user"} from_user_id={1} />
            <MessageComponent message={'some msg'} sent_at={"20:51"} from_user_username={"user"} from_user_id={1} />
            <MessageComponent message={'some msg'} sent_at={"20:51"} from_user_username={"user"} from_user_id={1} />
            <MessageComponent message={'some msg'} sent_at={"20:51"} from_user_username={"user"} from_user_id={1} /> */}
        </div>

        <div className="row g-3 sendMsgArea p-3">
            <div className="col-11">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div className="col-1">
                <button type="submit" className="btn btn-primary mb-3">Send</button>
            </div>
        </div>

    </>
}