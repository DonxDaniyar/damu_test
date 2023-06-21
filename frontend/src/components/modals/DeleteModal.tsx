import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import {axios} from '@/config/axios';
import { useContext } from "react";
import { useQuery } from "react-query";
import { User } from "@/models/User";
import UserMain from '@/pages/user/UserMain';

const DeleteModal = (User: any) => {
    modals.openConfirmModal({
        title: 'Вы точно уверены?',
        children: (
        <Text size="sm">
            Удалить выбранную запись?
        </Text>
        ),
        labels: { confirm: 'Удалить', cancel: 'Отменить' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            axios.delete("/user/delete/"+User.ID).then(()=>{
                modals.closeAll
                //TODO реализовать в Query
                location.reload()
            })
        },
    });

}

export default DeleteModal