import Avatar from "components/avatar/avatar";
import Button from "components/button/button";
import FormModal from "components/form-modal/form-modal";
import { Colors, BookUser, Weights, BookRoles } from "consts";
import { Dispatch, FC } from "react";

import {ReactComponent as AddUserIcon } from "assets/icons/user-add.svg";

import "./change-user-permissions.scss";
import { showDate } from "utils/show-date";

interface Props {
  setActiveUser: Dispatch<React.SetStateAction<BookUser | null>>;
  user: BookUser
}

const ChangeUserPermissions:FC<Props> = function({ user, setActiveUser }) {
  const handleModalClose = () => {
    setActiveUser(null);
  }

  console.log(user);
  
  return (
    <FormModal onClose={handleModalClose} opened={true}>
      <div className="change-user-permissions">
        <Avatar className="change-user-permissions__avatar" chars={user.name.slice(0, 1)} color={user.color} />
        <p className="change-user-permissions__name">{user.name}</p>
        <p className="change-user-permissions__id">ID: {user.id}</p>

        <div className="change-user-permissions__props">
          <div className="change-user-permissions__row">
            <p className="change-user-permissions__prop-name">Status</p>
            <p className="change-user-permissions__prop-value">{BookRoles[user.role - 1]}</p>
          </div>
          <div className="change-user-permissions__row">
            <p className="change-user-permissions__prop-name">Date added</p>
            <p className="change-user-permissions__prop-value">{showDate(new Date(user.created_at), false)}</p>
          </div>
        </div>

        <Button className="change-user-permissions__btn change-user-permissions__btn--admin" color={Colors.muted} weight={Weights.medium}>
          Make admin
          <AddUserIcon />
        </Button>  
        <Button className="change-user-permissions__btn change-user-permissions__btn--delete" color={Colors.delete}>Delete user</Button>  
      </div>
    </FormModal>
  );
}

export default ChangeUserPermissions;