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
import { useMutation, useQuery } from "react-query";
import { client } from "utils/client";

import "./profile-settings.scss";

const ProfileSettings:FC = function() {
  const { user, setUser } = useAuth();

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

  const [ nameValue, setNameValue ] = useState<string>(user ? user.name : "");
  const [ mailValue, setMailValue ] = useState<string>(user ? user.email : "");
  const currentAvatar: Avatar | null = (avatars && user) ? avatars.find((avatar: Avatar) => avatar.color === user.avatar) : null;  
  const [ avatar, setAvatar ] = useState<number | null>(currentAvatar ? currentAvatar.id : null);

  const { mutateAsync, isLoading: isChanging } = useMutation(() => client(`users`, {
    token: user?.token,
    method: "PUT",
    data: {
      name: nameValue,
      email: mailValue,
      avatar: avatar ? String(avatar) : "1"
    }
  }));

  const handleNameChange = (evt: any) => setNameValue(evt.target.value);
  const handleMailChange = (evt: any) => setMailValue(evt.target.value);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const currentAvatar = avatar;

    mutateAsync().then(() => {
      if (user && avatars) {
        setUser({
          ...user,
          name: nameValue,
          email: mailValue,
          avatar: avatars.find((avatar: Avatar) => avatar.id === currentAvatar).color
        })
      }
    });
  }

  const hanldeLogoutClick = () => logout().then(() => window.location.assign(window.location.toString()));
  
  const handleAvatarsChange = (evt: any) => {
    if (evt.target.matches("input[type='radio']")) {
      setAvatar(+evt.target.dataset.id);
    }
  }

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
              <div onChange={handleAvatarsChange} className="profile-settings__colors">
                {isLoading && !avatars && <AvatarsSkeleton />}
                {avatars && avatars.map((avatar: Avatar) => (
                  <label key={avatar.id} className="profile-settings__color-label">
                    <input
                      defaultChecked={avatar.color === user?.avatar}
                      style={{backgroundColor: avatar.color}}
                      className="profile-settings__color-radio"
                      type="radio"
                      name="color"
                      data-id={avatar.id}
                    />
                  </label>  
                ))}
              </div>
            </div>

            <Button disabled={isChanging} className="settings-page__btn settings-page__submit" tpye="submit">{isChanging ? "Saving..." : "Save Changes"}</Button>
          </form>
          <Button onClick={hanldeLogoutClick} className="settings-page__btn settings-page__delete" color={Colors.delete} tpye="button">Exit</Button>
        </Container>
      </main>
      <Nav />
    </>
  );
}

export default ProfileSettings;