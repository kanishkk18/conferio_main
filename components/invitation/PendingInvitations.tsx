import { Error, LetterAvatar, Loading } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { Team } from '@prisma/client';
import useInvitations from 'hooks/useInvitations';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import type { ApiResponse } from 'types/base';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { TeamInvitation } from 'models/invitation';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from '../ui/button';

const PendingInvitations = ({ team }: { team: Team }) => {
  const [selectedInvitation, setSelectedInvitation] =
    useState<TeamInvitation | null>(null);

  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);

  const { isLoading, isError, invitations, mutateInvitation } = useInvitations({
    slug: team.slug,
    sentViaEmail: true,
  });

  const { t } = useTranslation('common');

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={isError.message} />;
  }

  const deleteInvitation = async (invitation: TeamInvitation | null) => {
    if (!invitation) {
      return;
    }

    const sp = new URLSearchParams({ id: invitation.id });

    const response = await fetch(
      `/api/teams/${team.slug}/invitations?${sp.toString()}`,
      {
        method: 'DELETE',
        headers: defaultHeaders,
      }
    );

    const json = (await response.json()) as ApiResponse<unknown>;

    if (!response.ok) {
      toast.error(json.error.message);
      return;
    }

    mutateInvitation();
    toast.success(t('invitation-deleted'));
  };

  if (!invitations || !invitations.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <h2 className="text-xl font-medium leading-none tracking-tight">
          {t('pending-invitations')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('description-invitations')}
        </p>
      </div>

     <Table>
      <TableCaption>{t('pending-invitations')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">{t('email')}</TableHead>
          <TableHead className="min-w-[200px]">{t('role')}</TableHead>
          <TableHead className="min-w-[200px]">{t('expires-at')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => (
          <TableRow key={invitation.id}>
            <TableCell>
              {invitation.email && (
                <div className="flex items-center space-x-2">
                  <LetterAvatar name={invitation.email} />
                  <span>{invitation.email}</span>
                </div>
              )}
            </TableCell>
            <TableCell>{invitation.role}</TableCell>
            <TableCell>{new Date(invitation.expires).toDateString()}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => {
                  setSelectedInvitation(invitation);
                  setConfirmationDialogVisible(true);
                }}
              >
                {t("remove")}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>


      <ConfirmationDialog
        visible={confirmationDialogVisible}
        onCancel={() => setConfirmationDialogVisible(false)}
        onConfirm={() => deleteInvitation(selectedInvitation)}
        title={t('confirm-delete-member-invitation')}
      >
        {t('delete-member-invitation-warning', {
          email: selectedInvitation?.email,
        })}
      </ConfirmationDialog>
    </div>
  );
};

export default PendingInvitations;
