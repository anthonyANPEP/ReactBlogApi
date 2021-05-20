<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderUsers implements EventSubscriberInterface 

{
    /** @var UserPasswordEncoderInterface */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface  $encoder)
    {
        $this->encoder = $encoder;
    }

    public static function getSubscribedEvents()
    {

        //Permet de récupérer l'évènement avant qu'il soit soumis à la BDD
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event){
        //Récupère l'évenement qui passe par le controller de API Platform
        $result = $event->getControllerResult();

        //Récupère la méthode d'envoi  
        $method = $event->getRequest()->getMethod();

        //Filtre la method pour bien intéragir au moment de la création d'un utilisateur 
        if ($result instanceof User && $method === "POST") {
            
            //Hash du mot de passe avant l'insertion en BDD
            $hash = $this->encoder->encodePassword($result,$result->getPassword());

            $result->setPassword($hash);

        }

    }
}