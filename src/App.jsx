import { useState,useEffect} from 'react'
import moon from './assets/icon-moon.svg';
import sun from './assets/icon-sun.svg';
import search from './assets/icon-search.svg';
import location from './assets/icon-location.svg';
import website from './assets/icon-website.svg';
import twitter from './assets/icon-twitter.svg';
import company from './assets/icon-company.svg';
import githublogo from './assets/583231.png';
import './App.css'

function App() {
   const [light,setlight]=useState(true);
   const [dark,setdark]=useState(false);
   const [tog ,settog]=useState(false);
   const [err,seterr]=useState(false);
  const [username, setUsername] = useState("");
  const [user, setuser] = useState({
    name : "The Octocat",
    login : "octocat",
    bio : "This profile has No Bio",
    location : "San Francisco",
    blog : "https://github.blog/",
    avatar_url: githublogo,
    created_at : "Joined 25 jan 11",
    twitter_username : "Not Available",
    company :"@github",
    public_repos : "8",
    followers : "22.1k",
    following : "9",
  });
  const hi = async () => {
  if (!username) return;


  try {
    const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    if (res.status === 403) {
     seterr(true)
      return;
    }

    const data = await res.json();
    if (data.message === "Not Found") {
  seterr(true);
} else {
  setuser(data);
  seterr(false);
}
    setuser({
      name: data.name || "Not Found",
      login: data.login || "username",
      bio: data.bio || "This Profile has no bio",
      location: data.location || "Unknown",
      blog: data.blog || "https://example.com",
      avatar_url: data.avatar_url,
      twitter_username :data.twitter_username || "Not Available",
      company : data.company  || "Nothing Mention",
      created_at :data.created_at || "Joined 25 jan 11",
      public_repos :data.public_repos || "0",
      followers : data.followers || "0",
      following :data.following  || "0",
      avatar_url:data.avatar_url || githublogo,
    });
  } catch (err) {
    seterr(true);
  }
};


   const userclicklight=() =>{
    setlight(false);
    setdark(true);
    settog(!tog);
    document.body.classList.add('light');
   }

   const userclickdark=() =>{
    setdark(false);
    setlight(true);
    document.body.classList.remove('light');
   }


  return (
    <div>
      <div className='container'>
        <div className='first-flex'>
        <h1>devfinder</h1>
        <div className='tog-flex'>
        {light &&(
        <div className='light-tog'>
          <p>LIGHT</p>
          <img src={sun} alt='sun-img' className='sun-img' onClick={userclicklight}></img>
        </div>
        )}
        {dark &&(
        <div className='dark-tog'>
          <p>DARK</p>
          <img src={moon} alt='moon-img' className='moon-img' onClick={userclickdark}></img>
          </div>
        )}
          </div>
          </div>
          <div className='first-search-box'>
            <div className='search-fl'>
            <img src={search} alt='search-img'></img>
            <input type='text' alt='username' className='user-name-input' placeholder='Search Github Username..' onChange={(e)=>setUsername(e.target.value)}></input>
            </div>
            <button className='search-btn' onClick={hi}>Search</button>
          </div>
          <div className='user-all-box'>
            {user &&(
            <div className='user-fl'>
              <div className='yi'>
            <div className='user-img'>
              <img src={user.avatar_url} alt='githublog' className='github-img'></img>
            </div>
            <div className='row'>
            <div className='user-main-name'>
            <h2>{user.name}</h2>
            <p>{user.login}</p>
            </div>
            <div className='data'>
            <p>
                Joined{" "}
             {new Date(user?.created_at).toLocaleDateString("en-GB", {
             day: "2-digit",
             month: "short",
              year: "2-digit"
                 })}  
            </p>
            </div>
            </div>
            </div>
            <div className='ti'>
            <div className='discription'>
              <p>{user.bio}</p>
            </div>
            <div className='user-data'>
              <div className='repo'>
                <p>Repos</p>
                <p className='number'>{user.public_repos}</p>
              </div>
              <div className='followers'>
                <p>Followers</p>
                <p className='number'>{user.followers}</p>
              </div>
              <div className='following'>
                <p>Following</p>
                <p className='number'>{user.following}</p>
              </div>
            </div>
            <div className='link-data'>
              <div className='blog-one'>
              <div className='location-box'>
                <img src={location} alt='location-img'></img>
                <p>{user.location}</p>
              </div>
              <div className='website-box'>
                <img src={website} alt='website-img'></img>
                <p className='call'>{user.blog}</p>
              </div>
              </div>
              <div className='blog-two'>
              <div className='twitter-box'>
                <img src={twitter} alt='twitter-img'></img>
                <p>{user.twitter_username}</p>
              </div>
              <div className='company-box'>
                <img src={company} alt='company-img'></img>
                <p>{user.company}</p>
              </div>
              </div>
            </div>
            </div>
            </div>
  )}
          </div>
      </div>
    </div>

   
  )
}

export default App
