/**
 * SPaget - Application JavaScript
 * Interactions minimales pour le dashboard
 */

class SPagetApp {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.rightPanel = document.getElementById('right-panel-container');
        this.contentArea = document.getElementById('content-area');
        this.currentStoryId = null;
        
        this.init();
    }
    
    init() {
        this.initSidebar();
        this.initStoryRows();
        this.initRightPanel();
        this.initTooltips();
        this.initResponsive();
    }
    
    /**
     * Initialisation de la sidebar
     */
    initSidebar() {
        // Toggle sidebar (mobile)
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
        
        // Collapse sidebar (desktop)
        const collapseBtn = document.getElementById('sidebarCollapseBtn');
        if (collapseBtn) {
            collapseBtn.addEventListener('click', () => {
                this.collapseSidebar();
            });
        }
        
        // Fermer la sidebar en cliquant à l'extérieur (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && 
                this.sidebar && 
                this.sidebar.classList.contains('show') &&
                !this.sidebar.contains(e.target) &&
                !e.target.closest('#sidebarToggle')) {
                this.closeSidebar();
            }
        });
    }
    
    /**
     * Initialisation des lignes de stories
     */
    initStoryRows() {
        const storyRows = document.querySelectorAll('.story-row, .story-card');
        storyRows.forEach(row => {
            row.addEventListener('click', (e) => {
                // Éviter d'ouvrir le panneau si on clique sur un bouton d'action
                if (e.target.closest('.action-buttons')) {
                    return;
                }
                
                const storyId = row.dataset.storyId;
                this.openStoryDetail(storyId, row);
            });
        });
    }
    
    /**
     * Initialisation du panneau de droite
     */
    initRightPanel() {
        const closeBtn = document.getElementById('closePanelBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeRightPanel();
            });
        }
        
        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.rightPanel && this.rightPanel.classList.contains('show')) {
                this.closeRightPanel();
            }
        });
    }
    
    /**
     * Initialisation des tooltips Bootstrap
     */
    initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    /**
     * Gestion responsive
     */
    initResponsive() {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                // Desktop : fermer la sidebar mobile si ouverte
                if (this.sidebar && this.sidebar.classList.contains('show')) {
                    this.sidebar.classList.remove('show');
                }
            }
        });
    }
    
    /**
     * Toggle de la sidebar (mobile)
     */
    toggleSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.toggle('show');
        }
    }
    
    /**
     * Fermer la sidebar (mobile)
     */
    closeSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.remove('show');
        }
    }
    
    /**
     * Collapse/expand de la sidebar (desktop)
     */
    collapseSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.toggle('collapsed');
            
            // Mettre à jour l'icône du bouton
            const icon = this.sidebar.querySelector('.sidebar-toggle i');
            if (icon) {
                if (this.sidebar.classList.contains('collapsed')) {
                    icon.className = 'bi bi-chevron-right';
                } else {
                    icon.className = 'bi bi-chevron-left';
                }
            }
        }
    }
    
    /**
     * Ouvrir le détail d'une story
     */
    openStoryDetail(storyId, rowElement) {
        if (!this.rightPanel) return;
        
        this.currentStoryId = storyId;
        
        // Marquer la ligne comme sélectionnée
        document.querySelectorAll('.story-row, .story-card').forEach(row => {
            row.classList.remove('selected');
        });
        rowElement.classList.add('selected');
        
        // Charger les données de la story (simulation)
        this.loadStoryData(storyId);
        
        // Afficher le panneau
        this.rightPanel.classList.add('show');
        
        // Ajuster la zone de contenu (desktop uniquement)
        if (window.innerWidth >= 768 && this.contentArea) {
            this.contentArea.classList.add('with-panel');
        }
    }
    
    /**
     * Fermer le panneau de droite
     */
    closeRightPanel() {
        if (this.rightPanel) {
            this.rightPanel.classList.remove('show');
        }
        
        if (this.contentArea) {
            this.contentArea.classList.remove('with-panel');
        }
        
        // Désélectionner la ligne
        document.querySelectorAll('.story-row, .story-card').forEach(row => {
            row.classList.remove('selected');
        });
        
        this.currentStoryId = null;
    }
    
    /**
     * Charger les données d'une story (simulation)
     */
    loadStoryData(storyId) {
        // Simulation des données - en production, ceci ferait un appel AJAX
        const sampleData = this.getSampleStoryData(storyId);
        
        // Mettre à jour le panneau
        this.updateRightPanel(sampleData);
    }
    
    /**
     * Données d'exemple pour une story
     */
    getSampleStoryData(storyId) {
        const stories = {
            '1': {
                title: 'Implement search functionality',
                type: 'Story',
                sprint: 'Sprint 12',
                assignee: 'BR',
                status: 'In development',
                description: 'Develop a search feature allowing users to search for content within the application.',
                checklist: [
                    { id: 'check1', text: 'Create search API endpoint', checked: true },
                    { id: 'check2', text: 'Design search interface', checked: true },
                    { id: 'check3', text: 'Implement search filters', checked: false }
                ],
                activity: [
                    { text: 'Estimate changed from 5 to 8', time: '3 hours ago' }
                ]
            }
        };
        
        return stories[storyId] || stories['1'];
    }
    
    /**
     * Mettre à jour le contenu du panneau de droite
     */
    updateRightPanel(data) {
        // Titre
        const titleEl = document.getElementById('panel-title');
        if (titleEl) titleEl.textContent = data.title;
        
        // Type et sprint
        const typeEl = document.getElementById('panel-type');
        if (typeEl) typeEl.textContent = data.type;
        
        const sprintEl = document.getElementById('panel-sprint');
        if (sprintEl) sprintEl.textContent = data.sprint;
        
        // Assigné
        const assigneeEl = document.getElementById('panel-assignee');
        if (assigneeEl) assigneeEl.textContent = data.assignee;
        
        // Statut
        const statusEl = document.getElementById('panel-status');
        if (statusEl) statusEl.textContent = data.status;
        
        // Description
        const descEl = document.getElementById('panel-description');
        if (descEl) descEl.textContent = data.description;
        
        // Checklist
        this.updateChecklist(data.checklist);
        
        // Activité
        this.updateActivity(data.activity);
    }
    
    /**
     * Mettre à jour la checklist
     */
    updateChecklist(items) {
        const container = document.getElementById('panel-checklist');
        if (!container || !items) return;
        
        container.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'form-check';
            div.innerHTML = `
                <input class="form-check-input" type="checkbox" id="${item.id}" ${item.checked ? 'checked' : ''}>
                <label class="form-check-label" for="${item.id}">
                    ${item.text}
                </label>
            `;
            container.appendChild(div);
        });
    }
    
    
    /**
     * Mettre à jour l'activité
     */
    updateActivity(activities) {
        const container = document.getElementById('panel-activity');
        if (!container || !activities) return;
        
        container.innerHTML = '';
        activities.forEach(activity => {
            const div = document.createElement('div');
            div.className = 'activity-item';
            div.innerHTML = `
                <div class="activity-content">
                    <span class="activity-text">${activity.text}</span>
                    <span class="activity-time text-muted">${activity.time}</span>
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new SPagetApp();
});

// Styles CSS additionnels pour les états sélectionnés
const additionalStyles = `
    .story-row.selected,
    .story-card.selected {
        background-color: rgba(0,123,255,0.1) !important;
        border-left: 3px solid #007bff;
    }
    
    .story-row.selected td:first-child {
        border-left: none;
    }
`;

// Ajouter les styles au document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
