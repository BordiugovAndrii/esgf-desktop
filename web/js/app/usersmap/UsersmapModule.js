/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.UsersmapModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: [//'MyDesktop.usersmap.views.ProjectTreePanel',
               'MyDesktop.usersmap.views.SettingsPanel'],
    id: 'usersmap-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Clients map',
            iconCls:'usersMap',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
//        	var projectTreePanel = new MyDesktop.usersmap.views.ProjectTreePanel();
        	var settingsPanel = new MyDesktop.usersmap.views.SettingsPanel();
        	
            win = desktop.createWindow({
            	id              : 'usersmap-win',
                title           : 'Clients map',
//                width           : 1290,
                height          : 768,
                width           : 1043,
                iconCls         : 'usersMap',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                /*items: [{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
                    padding : 5,
                    items: [
                            projectTreePanel,
                            settingsPanel]
                }]*/
                items           : [settingsPanel],
                listeners : {
                	scope  : this,
                	resize : this.resizeMap
                }
            });
        }
        win.show();
//        win.on('beforerender', this.loadContent());
        return win;
    },

    loadContent : function(){
    	if(Ext.getCmp('usersmapProjectTree')) {
    		// get project tree panel and expand it
    		var projectTree = Ext.getCmp('usersmapProjectTree');
    		projectTree.expand(false);
    		// expand root to load its content
        	projectTree.getRootNode().expand();
//        	projectTree.getSelectionModel().select(projectTree.getRootNode());
    	}
    },
    
    resizeMap : function() {
    	if(Ext.getCmp('usersMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('usersMap').getMap(), "resize");
    	}
    }
});

