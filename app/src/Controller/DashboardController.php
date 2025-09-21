<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    #[Route('/', name: 'dashboard')]
    public function index(): Response
    {
        // Charger les données d'exemple
        $sampleDataPath = $this->getParameter('kernel.project_dir') . '/assets/_sample_data.json';
        $sampleData = [];
        
        if (file_exists($sampleDataPath)) {
            $jsonContent = file_get_contents($sampleDataPath);
            $sampleData = json_decode($jsonContent, true);
        }
        
        // Extraire les données pour le template
        $items = $sampleData['sample_items'] ?? [];
        $capacityData = $sampleData['capacity_data'] ?? [];
        
        return $this->render('dashboard/list.html.twig', [
            'items' => $items,
            'sample_items' => $items, // Fallback pour le template
            'total_sp' => $capacityData['total_sp'] ?? 320,
            'capacity' => $capacityData['capacity'] ?? 255,
            'delta' => $capacityData['delta'] ?? -70,
        ]);
    }
    
    #[Route('/api/story/{id}', name: 'api_story_detail', methods: ['GET'])]
    public function getStoryDetail(int $id): Response
    {
        // Charger les données d'exemple
        $sampleDataPath = $this->getParameter('kernel.project_dir') . '/assets/_sample_data.json';
        $sampleData = [];
        
        if (file_exists($sampleDataPath)) {
            $jsonContent = file_get_contents($sampleDataPath);
            $sampleData = json_decode($jsonContent, true);
        }
        
        $items = $sampleData['sample_items'] ?? [];
        
        // Trouver l'item par ID
        $story = null;
        foreach ($items as $item) {
            if ((int)$item['id'] === $id) {
                $story = $item;
                break;
            }
        }
        
        if (!$story) {
            return $this->json(['error' => 'Story not found'], 404);
        }
        
        return $this->json($story);
    }
}
