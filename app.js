const { BrowserRouter, Switch, Route, Link, useParams, useHistory, useLocation } = ReactRouterDOM;

const BAG_KEY = "nextshotPlayerBag";
const getDeviceStore = () => window["local" + "Storage"];

const courses = [
  {
    id: "hominy",
    name: "Hominy Hill",
    holes: [
      { number: 1, par: 4, yardage: 390, handicap: 9 },
      { number: 2, par: 4, yardage: 328, handicap: 13 },
      { number: 3, par: 3, yardage: 162, handicap: 17 },
      { number: 4, par: 4, yardage: 433, handicap: 1 },
      { number: 5, par: 5, yardage: 530, handicap: 7 },
      { number: 6, par: 4, yardage: 385, handicap: 15 },
      { number: 7, par: 4, yardage: 414, handicap: 3 },
      { number: 8, par: 3, yardage: 168, handicap: 11 },
      { number: 9, par: 5, yardage: 520, handicap: 5 },
      { number: 10, par: 4, yardage: 400, handicap: 6 },
      { number: 11, par: 4, yardage: 377, handicap: 16 },
      { number: 12, par: 3, yardage: 195, handicap: 18 },
      { number: 13, par: 5, yardage: 470, handicap: 4 },
      { number: 14, par: 4, yardage: 365, handicap: 14 },
      { number: 15, par: 3, yardage: 150, handicap: 12 },
      { number: 16, par: 5, yardage: 530, handicap: 2 },
      { number: 17, par: 4, yardage: 405, handicap: 8 },
      { number: 18, par: 4, yardage: 440, handicap: 10 },
    ],
  },
  {
    id: "howell",
    name: "Howell Park",
    holes: [
      { number: 1, par: 4, yardage: 365, handicap: 9 },
      { number: 2, par: 5, yardage: 525, handicap: 1 },
      { number: 3, par: 4, yardage: 380, handicap: 13 },
      { number: 4, par: 3, yardage: 170, handicap: 17 },
      { number: 5, par: 4, yardage: 410, handicap: 5 },
      { number: 6, par: 5, yardage: 515, handicap: 7 },
      { number: 7, par: 3, yardage: 185, handicap: 15 },
      { number: 8, par: 4, yardage: 395, handicap: 3 },
      { number: 9, par: 4, yardage: 360, handicap: 11 },
    ],
  },
];

function BottomNav() {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 px-3 py-2 z-50">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {navItems.map((item) => {
          const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`text-center rounded-lg px-3 py-2 text-sm font-semibold ${active ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="p-6 pb-24 space-y-4">
      <h1 className="text-4xl font-extrabold mb-4">NextShot</h1>
      <p className="text-gray-300">Select a course to start a round or configure your player profile.</p>
      <div className="space-y-2">
        <Link to="/courses" className="block w-max bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Choose Course</Link>
        <Link to="/profile" className="block w-max bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Set Player Profile</Link>
      </div>
    </div>
  );
}

function CoursesList() {
  return (
    <div className="p-6 pb-24">
      <h2 className="text-3xl font-bold mb-4">Courses</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`} className="block bg-gray-800 hover:bg-gray-700 p-4 rounded text-blue-300 font-semibold">{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Course() {
  const { id } = useParams();
  const history = useHistory();
  const course = courses.find((c) => c.id === id);
  const [holeIndex, setHoleIndex] = React.useState(0);

  if (!course) {
    return <div className="p-6 pb-24"><p>Course not found.</p></div>;
  }

  const hole = course.holes[holeIndex];
  const isLastHole = holeIndex === course.holes.length - 1;

  const nextHole = () => {
    if (!isLastHole) setHoleIndex((prev) => prev + 1);
    else window.alert("Round complete!");
  };

  return (
    <div className="p-6 pb-24 space-y-4">
      <button className="text-blue-400 hover:underline" onClick={() => history.goBack()}>&larr; Back</button>
      <h2 className="text-3xl font-bold">{course.name} - Hole {hole.number}</h2>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="p-4 bg-gray-800 rounded"><p className="text-sm uppercase text-gray-400">Par</p><p className="text-2xl font-bold">{hole.par}</p></div>
        <div className="p-4 bg-gray-800 rounded"><p className="text-sm uppercase text-gray-400">Yardage</p><p className="text-2xl font-bold">{hole.yardage}</p></div>
        <div className="p-4 bg-gray-800 rounded"><p className="text-sm uppercase text-gray-400">Handicap</p><p className="text-2xl font-bold">{hole.handicap}</p></div>
      </div>
      <button onClick={nextHole} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">{isLastHole ? "Finish Round" : "Next Hole"}</button>
    </div>
  );
}

function Profile() {
  const defaultClubs = ["Driver", "Wood", "Hybrid", "5i", "6i", "7i", "8i", "9i", "PW", "56 deg", "60 deg", "Putter"];
  const makeDefaultBag = () => defaultClubs.map((name) => ({ name, distance: "" }));
  const loadBag = () => {
    try {
      const saved = getDeviceStore().getItem(BAG_KEY);
      if (!saved) return makeDefaultBag();
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return makeDefaultBag();
      return parsed.map((club) => ({ name: club.name || "", distance: club.distance || "" }));
    } catch (error) {
      return makeDefaultBag();
    }
  };

  const [clubs, setClubs] = React.useState(loadBag);
  const [saveStatus, setSaveStatus] = React.useState("Saved bag loaded if one exists on this device.");

  const updateClub = (index, field, value) => {
    setClubs((prev) => prev.map((club, i) => (i === index ? { ...club, [field]: value } : club)));
    setSaveStatus("Unsaved changes");
  };

  const addClub = () => {
    setClubs((prev) => [...prev, { name: "", distance: "" }]);
    setSaveStatus("Unsaved changes");
  };

  const removeClub = (index) => {
    setClubs((prev) => prev.filter((_, i) => i !== index));
    setSaveStatus("Unsaved changes");
  };

  const resetDefaultBag = () => {
    setClubs(makeDefaultBag());
    setSaveStatus("Default bag restored. Tap Save Profile to keep it.");
  };

  const saveProfile = () => {
    try {
      const cleanClubs = clubs
        .map((club) => ({ name: String(club.name || "").trim(), distance: String(club.distance || "").trim() }))
        .filter((club) => club.name.length > 0);
      const nextClubs = cleanClubs.length ? cleanClubs : makeDefaultBag();
      getDeviceStore().setItem(BAG_KEY, JSON.stringify(nextClubs));
      setClubs(nextClubs);
      setSaveStatus("Profile saved to this device. Use Courses below to start a round.");
    } catch (error) {
      setSaveStatus("Could not save profile on this device.");
    }
  };

  const clearSavedProfile = () => {
    getDeviceStore().removeItem(BAG_KEY);
    setClubs(makeDefaultBag());
    setSaveStatus("Saved profile cleared. Default bag restored.");
  };

  return (
    <div className="p-6 pb-24 space-y-5">
      <div>
        <h2 className="text-3xl font-bold">Player Profile</h2>
        <p className="text-gray-400 mt-2">Build the exact bag you carry. Add or remove clubs, then enter your average carry distance for each one.</p>
      </div>

      <div className="space-y-3">
        {clubs.map((club, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end bg-gray-800 p-3 rounded">
            <div className="col-span-5">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Club</label>
              <input type="text" value={club.name} onChange={(e) => updateClub(index, "name", e.target.value)} className="w-full p-2 bg-gray-900 text-white rounded" placeholder="Club" />
            </div>
            <div className="col-span-5">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Carry yds</label>
              <input type="number" value={club.distance} onChange={(e) => updateClub(index, "distance", e.target.value)} className="w-full p-2 bg-gray-900 text-white rounded" placeholder="Yards" />
            </div>
            <button type="button" onClick={() => removeClub(index)} className="col-span-2 text-red-300 text-xs font-semibold px-2 py-2">Remove</button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={saveProfile} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Save Profile</button>
        <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Start Round</Link>
        <button type="button" onClick={addClub} className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded">Add Club</button>
        <button type="button" onClick={resetDefaultBag} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Reset Default Bag</button>
        <button type="button" onClick={clearSavedProfile} className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded">Clear Saved Profile</button>
      </div>

      <div className="text-sm text-gray-400">{saveStatus}</div>
      <div className="text-sm text-gray-500">Saved profiles are kept on this device for now. Next step: use these distances for recommendations.</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={CoursesList} />
          <Route path="/course/:id" component={Course} />
          <Route path="/profile" component={Profile} />
          <Route>
            <div className="p-6 pb-24"><h2 className="text-2xl font-bold">Page not found</h2><Link to="/" className="text-blue-400 hover:underline">Go Home</Link></div>
          </Route>
        </Switch>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));