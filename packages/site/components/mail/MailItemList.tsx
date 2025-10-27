import "@/styles/mail-list.css";
import React from "react";
import MailItem from "./MailItem";
import { Mail } from "@/types";

import { TAB_INDEXES, TabIndex } from "@/constants";

export interface MailItemListProps {
  mails: Mail[];
  selectedMailIds: number[];
  filteredMails: Mail[];
  activeTab: TabIndex;
  isSearching: boolean;
  setIsSelecting: (value: boolean) => void;
  setSelectedMailIds: (ids: number[]) => void;
  setActiveMail: (mail: Mail) => void;
}

const MailItemList: React.FC<MailItemListProps> = ({
  mails,
  selectedMailIds,
  filteredMails,
  isSearching,
  activeTab,
  setIsSelecting,
  setSelectedMailIds,
  setActiveMail,
}) => {
  const handleMailClick = (mail: Mail) => {
    setActiveMail(mail);
  };

  const isInboxTab = (tabIndex: number): boolean => {
    return tabIndex === TAB_INDEXES.INBOX;
  };

  const handleCheckboxToggle = (mailId: number) => {
    const isAlreadyIds = selectedMailIds.includes(mailId);
    const deselectedIds = selectedMailIds.filter((id) => id !== mailId);
    const addedMail = [...selectedMailIds, mailId];
    const newSelection = isAlreadyIds ? deselectedIds : addedMail;
    setSelectedMailIds(newSelection);
    setIsSelecting(newSelection.length > 0);
  };

  const NoMailState = () => (
    <div className="no-content mediumRegular">
      <div>
        <img src="/empty.svg" alt="" />
        You don't have any mails in this section.
      </div>
    </div>
  );

  const NoMailSearch = () => (
    <div className="no-content mediumRegular">
      <div>No results found.</div>
    </div>
  );

  const MailList = () =>
    (isSearching ? filteredMails : mails).map((mail) => (
      <MailItem
        key={mail.id}
        mail={mail}
        onMailClick={handleMailClick}
        onCheckboxToggle={handleCheckboxToggle}
        isChecked={selectedMailIds.includes(mail.id)}
        isInboxTab={isInboxTab(activeTab)}
      />
    ));

  return (
    <div className="mail-list">
      {isSearching && filteredMails.length === 0 ? (
        <NoMailSearch />
      ) : mails.length === 0 ? (
        <NoMailState />
      ) : (
        <MailList />
      )}
    </div>
  );
};

export default MailItemList;
