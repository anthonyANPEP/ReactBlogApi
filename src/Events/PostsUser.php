<?php

namespace App\Events;

use DateTimeZone;
use App\Entity\Post;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PostsUser implements EventSubscriberInterface
{
    /** @var Security */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents(){
        return[
            KernelEvents::VIEW => ['setUserForPost', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForPost(ViewEvent $event){

        $result = $event->getControllerResult();


        $method = $event->getRequest()->getMethod();


        if ($result instanceof Post && $method === "POST") {

            
            
            $user = $this->security->getUser();
            
            $result->setSendAt(new \DateTime('NOW', new DateTimeZone('EUROPE/Paris')));
            $result->setAuthor($user);

        }
    }

}