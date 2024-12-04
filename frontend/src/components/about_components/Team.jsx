import React,{useState,useEffect} from 'react';
import AboutSidebar from '../sidebar_components/AboutSidebar';

// Directly received JSON 


const Team = ({from_about}) => {
  const [team,setTeam] = useState({
    "bgColor": "white",
    "textColor": "black",
    "teamInfo": {
      "headings": {
        "title": "",
        "subheading": ""
      },
      "members": []
    }
})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data] = await Promise.all([
          fetch(`${apiUrl}/about/team`).then(res => res.json()),
        ]);

        setTeam(data);
        console.log(data);  // Change alert to console.log for better debugging
      
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <span className="loading loading-dots loading-lg mx-auto"></span>
  if (error) return <div>{error}</div>

  return (
    <div style={{ backgroundColor: team.bgColor, color: team.textColor,padding: '2rem' }}>
        {!from_about && (
        <AboutSidebar individual = {true}/>
      )

      }
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Text Section */}
        <div className="mb-10 md:mb-16">
          <h2 className={`mb-4 text-center text-2xl font-bold`} style={{  }}>
            {team.teamInfo.headings.title} {/* Directly accessing title */}
          </h2>
          <p className="mx-auto max-w-screen-md text-centermd:text-lg">
            {team.teamInfo.headings.subheading} {/* Directly accessing subheading */}
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {team.teamInfo.members.map(member => (
            <div key={member.id} className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-40 md:w-40">
                <img
                  src={member.imageUrl}
                  loading="lazy"
                  alt={member.name}
                  className="h-full w-full object-contain object-center"

                />
              </div>
              <div>
                <div className={`font-bold`} >{member.name}</div>
                <p className="text-center text-sm sm:text-left md:text-base">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
