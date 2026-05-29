const { BrowserRouter, Switch, Route, Link, useParams, useHistory } = ReactRouterDOM;

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

function Home() {
  return (
    <div className="p-6 space-y-4">
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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Courses</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`} className="text-blue-400 hover:underline">{course.name}</Link>
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
    return <div className="p-6"><p>Course not found.</p></div>;
  }

  const hole = course.holes[holeIndex];
  const isLastHole = holeIndex === course.holes.length - 1;

  const nextHole = () => {
    if (!isLastHole) setHoleIndex((prev) => prev + 1);
    else window.alert("Round complete!");
  };

  return (
    <div className="p-6 space-y-4">
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
  const [clubs, setClubs] = React.useState(defaultClubs.map((name) => ({ name, distance: "" })));

  const updateClub = (index, field, value) => {
    setClubs((prev) => prev.map((club, i) => (i === index ? { ...club, [field]: value } : club)));
  };

  const addClub = () => setClubs((prev) => [...prev, { name: "", distance: "" }]);
  const removeClub = (index) => setClubs((prev) => prev.filter((_, i) => i !== index));
  const resetDefaultBag = () => setClubs(defaultClubs.map((name) => ({ name, distance: "" })));

  return (
    <div className="p-6 space-y-5">
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
        <button type="button" onClick={addClub} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add Club</button>
        <button type="button" onClick={resetDefaultBag} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Reset Default Bag</button>
      </div>

      <div className="text-sm text-gray-500">Distances are stored for this session only. Next step: save these to local storage and use them for recommendations.</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses" component={CoursesList} />
        <Route path="/course/:id" component={Course} />
        <Route path="/profile" component={Profile} />
        <Route>
          <div className="p-6"><h2 className="text-2xl font-bold">Page not found</h2><Link to="/" className="text-blue-400 hover:underline">Go Home</Link></div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));