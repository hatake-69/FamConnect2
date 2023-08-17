import "./Sidebar.scss";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';
// import { collection, query } from 'firebase/firestore/lite';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';

const Sidebar = () => {

const user = useAppSelector((state) => state.user.user);
const {documents:channels} = useCollection("channels");

const addChannel =async () =>{
  let channelName: string | null = prompt("新しいチャンネルを作成します。")

  if(channelName){
    await addDoc(collection(db,"channels"),{
      channelName:channelName,
    })
  }
}

  return (
    <div>
      <div className='sidebar'>
        {/*sidebarLeft */}
        <div className='sidebarLeft'>
          <div className='serverIcon'>
            <img src="./appicon.png" alt="" />
          </div>

        </div>
        {/*sidebarRight */}
        <div className='sidebarRight'>
          <div className="sidebarTop">
            <h3>FamConnect</h3>
            
          </div>
          {/*sidebarChannels */}
          <div className='sidebarChannels'>
            <div className='sidebarChannelsHeader'>
              <div className="sidebarHeader">
                <ExpandCircleDownOutlinedIcon/>
                <h4>家族</h4>
              
              </div>
              <AddIcon className='sidebarAddIcon' onClick={() => addChannel()} />
            </div>

            <div className='sidebarChannelList'>
              {channels.map((channel)=>(
                <SidebarChannel channel={channel} id={channel.id}/>
              ))}
              
              {/* <SidebarChannel/>
              <SidebarChannel/>
              <SidebarChannel/> */}
            </div>

            <div className="sidebarFooter">
              <div className='sidebarAccount'>
                <img src={user?.photo} alt="" onClick={() => auth.signOut()}/>
                <div className="accountName">
                  <h4>{user?.displayName}</h4>
                  <span>#{user?.uid.substring(0,4)}</span>
                </div>
              </div>

              <div className="sidebarVoice">
                {/* <MicIcon/>
                <HeadphonesIcon/> */}
                <SettingsIcon/>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Sidebar
