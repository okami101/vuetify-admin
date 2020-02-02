<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/authentication_user", name="authentication_user")
     *
     * @param UserInterface $user
     * @param SerializerInterface $serializer
     * @return string
     */
    public function index(UserInterface $user, SerializerInterface $serializer)
    {
        return JsonResponse::fromJsonString($serializer->serialize($user, 'json', ['groups' => 'user:read']));
    }
}
