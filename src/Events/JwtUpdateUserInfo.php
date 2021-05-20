<?php

namespace App\Events;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtUpdateUserInfo
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        /** @var User */
        $user = $event->getUser();

        $data = $event->getData();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $data['pseudo'] = $user->getPseudo();
        $data['id'] = $user->getId();
        
        $event->setData($data);
    }
}