import { logout } from "auth-provider";
import Button from "components/button/button";
import Container from "components/container/container";
import Field from "components/field/field";
import AvatarsSkeleton from "components/loaders/avatars-skeleton/avatars-skeleton";

import Nav from "components/nav/nav";
import SettingsHeader from "components/settings-header/settings-header";
import { Avatar, Colors } from "consts";
import { useAuth } from "contexts/auth";
import { FC, FormEvent, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { client } from "utils/client";

import "./profile-settings.scss";

const ProfileSettings:FC = function() {
  const { user } = useAuth();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: "avatars",
    queryFn: () => {
      return client("avatars", {
        method: "GET",
        token: user?.token,
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });

  const [ nameValue, setNameValue ] = useState<string>(user ? user.name : "");
  const [ mailValue, setMailValue ] = useState<string>(user ? user.email : "");

  const avatars = useMemo(() => {
    if (data && user) {
      const userAvatar = data.avatars.find((avatar: Avatar) => avatar.color === user.avatar);
      const userAvatarIndex = data.avatars.findIndex((avatar: Avatar) => avatar.color === user.avatar);

      return [
        userAvatar,
        ...data.avatars.slice(0, userAvatarIndex),
        ...data.avatars.slice(userAvatarIndex + 1)
      ]
    }
    return null;
  }, [data, user]);

  const handleNameChange = (evt: any) => setNameValue(evt.target.value);
  const handleMailChange = (evt: any) => setMailValue(evt.target.value);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    alert("Not working yet");
  }

  const hanldeLogoutClick = () => logout();
  
  return (
    <>
      <SettingsHeader title="Profile" />
      <main className="settings-page profile-settings">
        <Container className="settings-page__container">
          <p className="settings-page__title">Profile</p>
          <p className="settings-page__description">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>

          <form onSubmit={handleFormSubmit} className="settings-page__form">
            <div className="settings-page__fields">
              <Field value={nameValue} onChange={handleNameChange} containerClass="settings-page__field" label="Name" type="text" />
              <Field value={mailValue} onChange={handleMailChange} containerClass="settings-page__field" label="E-mail" type="mail" />
              <label className="settings-page__label">Avatar color:</label>
              <div className="profile-settings__colors">
                {isLoading && !avatars && <AvatarsSkeleton />}
                {avatars && avatars.map((avatar: Avatar) => (
                  <label key={avatar.id} className="profile-settings__color-label">
                    <input
                      defaultChecked={avatar.color === user?.avatar}
                      style={{backgroundColor: avatar.color}}
                      className="profile-settings__color-radio"
                      type="radio"
                      name="color"
                    />
                  </label>  
                ))}
              </div>
            </div>

            <Button className="settings-page__btn settings-page__submit" tpye="submit">Save Changes</Button>
          </form>
          <Button onClick={hanldeLogoutClick} className="settings-page__btn settings-page__delete" color={Colors.delete} tpye="button">Exit</Button>
        </Container>
      </main>
      <Nav />
    </>
  );
}

export default ProfileSettings;