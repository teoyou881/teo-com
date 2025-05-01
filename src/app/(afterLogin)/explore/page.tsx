import Trend from '@/app/(afterLogin)/_component/Trend';
import SearchForm from '../_component/SearchForm';
import style from './explore.module.css'

export default function Home() {
  return (
      <main className={style.main}>
        <div className={style.formZone}>
          <SearchForm/>
        </div>
        <div className="style.trned">
          <h3>You might like</h3>
          <Trend/>
          <Trend/>
          <Trend/>
        </div>
      </main>
  );
}
