import {
  Routes,
  Route,
} from 'react-router-dom';

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>home</div>} />
      <Route
        path="*"
        element={(
          <div style={{ padding: '1rem' }}>
            <p>There`s nothing here!</p>
          </div>
              )}
      />
    </Routes>
  );
}
export default NavRoutes;
