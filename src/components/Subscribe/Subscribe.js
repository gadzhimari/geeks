import React, { PureComponent } from 'react';
import cn from 'cn-decorator';

import './Subscribe.scss';

@cn('Subscribe')
class Subscribe extends PureComponent {
  render(cn) {
    return (
      <div className={cn()}>
        <div className={cn('title')}>Подписаться</div>
        <div className={cn('subtitle')}>
          Ежемесячная подборка крутых новостей из игровой индустрии
        </div>

        <form action="" className={cn('form')}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className={cn('input')}
            required
          />
          <button type="submit" className={cn('button')} />
        </form>
      </div>
    );
  }
}

export default Subscribe;
