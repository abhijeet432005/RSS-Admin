import { memo, useState } from 'react';
import MaleDoodle from './avatars/MaleDoodle';
import FemaleDoodle from './avatars/FemaleDoodle';
import './avatar.css';

const SIZE_PRESETS = {
  sm: 34,
  md: 40,
  lg: 56,
  xl: 88,
};

function AvatarBase({ src, name, gender = 'male', size = 'md' }) {
  const [imgFailed, setImgFailed] = useState(false);
  const px = typeof size === 'number' ? size : SIZE_PRESETS[size] || SIZE_PRESETS.md;
  const showPhoto = src && !imgFailed;
  const Doodle = gender === 'female' ? FemaleDoodle : MaleDoodle;

  return (
    <span className="avatar" style={{ width: px, height: px }} title={name}>
      {showPhoto ? (
        <img
          src={src}
          alt={name ? `${name}'s avatar` : 'Profile avatar'}
          className="avatar__img"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <Doodle className="avatar__doodle" />
      )}
    </span>
  );
}

// Avatars are rendered per table row / list item — memoize so scrolling and
// unrelated re-renders don't re-mount the <img>/<svg> each time.
export default memo(AvatarBase);
