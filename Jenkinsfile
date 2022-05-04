import java.net.URLDecoder;

node ('node-gesparc-back') {

   previousBuildStatus = (currentBuild.getPreviousBuild() != null) ? currentBuild.getPreviousBuild.getResult() : null;
   
   try {
   
       notifyStarted()
       
       env.default_encoding = 'UTF-8'
       env.JAVA_HOME="${tool 'JDK8'}"
       env.MAVEN_HOME="${tool 'M3'}"
       env.PATH="${env.JAVA_HOME/bin:${env.PATH}"
       env.PATH="${env.MAVEN_HOME/bin:${env.PATH}"
       
       properties([
       		   disableConcurrentBuilds()
       ])
       
       timestamps {
           timeout(time: 1, unit: 'HOURS') {
               configFileProvider([configFile(filed: 'global_maven_config_full', variable: 'MAVEN_SETTINGS')]) {
                   withMaven(maven: 'M3', globalMavenSettingsConfig : 'global_maven_config_full') { 
                       stage('Initialize') {
                           deleteDir();
                       }
                       stage('Checkout') {
                           checkout scm
                       }
                       stage('Build Artifacts') {
                           sh "mvn -B -U -s $MAVEN_SETTINGS package"
                       }
                       stage('Sonar') {
                           withSonarQubeEnv('Sonar WEBAPI') {
                               sh "mvn -B -U -s $MAVEN_SETTINGS -DscmBranch=${env.BRANCH_NAME} validate sonar:sonar -P sonar"
                           }
                           def qg = waitForQualityGate()
                           if (qg.status != 'OK') {
                               unstable "Pipeline unstable due to quality gate failure: ${qg.status}"
                           }
                       }
                       stage('Archive Maven Repository' {
                           sh "mvn -B -U -s $MAVEN_SETTINGS deploy -P upload.artifacts"
                       }
                   }
               }
           }
       }
       
       notifySuccessful()
       
   } catch (err) {
       currentBuild.result = "FAILURE"
       notifyFailed()
       throw err
       
   }  finally {
        notifyChanged(currentBuild.result, previousBuildStatus);
   }
   
}

def notifyStarted() { /* .. */ }

def notifySuccessful() { /* .. */ }

def notifyFailed() {

    String job_name = URLDecoder.decode(env.JOB_NAME, env.default_encoding);
    String build_number = env.BUILD_NUMBER;
    String build_url = URLDecoder.decode(env.BUILD, env.default_encoding);
    String subject = "ECHEC: Job [${job_name}] $[{build_number}]"
    
    emailext(
            attachLog: true,
            compressLog: true,
            subject: "${subject}",
            body: """
        <p>ECHEC: Job \'${job_name} [${build_number}]\':</p>
        <p>V&eacute;rifier la console de sortie &agrave; l\'adresse suivante <a href=\'${build_url}\'>${job_name} [${build_number}]</a></p>
        <p>Le log du build est attach&eacute; &agrave; ce mail.<br\>
        Il est important de corriger le probl&egrave;me rapidement afin de ne pas bloquer la chaine d\'int&eacute;gration continue !!!</p>
    <br>
        <p>Cordialement,</p>
        <p>Maître JENKINS</p>
        """,
        to: khalil.amdouni@tfm.com.tn,
        recipientProviders: [[$class: 'DeveloppersRecipientProvider'], [$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']]
    )
}

def notifyChanged(String... args) {

    String sucessStatus = 'SUCCESS';
    String currentStatus = (args[0] != null) ? args[0] : sucessStatus;
    String previousStatus = (args[1] != null) ? args[1] : sucessStatus;
    String job_name = URLDecoder.decode(env.JOB_NAME, env.default_encoding);
    String build_number = env.BUILD_NUMBER;
    String build_url = URLDecoder.decode(env.BUILD_URL, env.default_encoding);
    String subject = sucessStatus.equals(currentStatus) ? "Le job [${job_name}] est revenu à un état stable" : "CHANGED : Job \'${job_name}\' [${build_number}]";
    
    if (!currentStatus.equals(previousStatus)) {
    
        emailext(
            attachLog: true,
            compressLog: true,
            subject: "${subject}",
            body: """
            <p>Le job \'${job_name}\': a changé de statut.</p>
            <p>
            Tâche Jenkins    :  ${job_name}<br>
            N° de build      :  ${build_number}<br>
            Précédent statut :  ${previousStatus}<br>
            Nouveau statut   :  ${currentStatus}<br>
            </p>
            <p>V&eacute;rifier la console de sortie &agrave; l\'adresse suivante <a href=\'${build_url}\'>${job_name} [${build_number}]</a></p>
            <p>Le log du build est attach&eacute; &agrave; ce mail.<br/></p>
        <br>
            <p>Cordialement,</p>
            <p>Maître JENKINS</p>
            """
            to: khalil.amdouni@tfm.com.tn,
            recipientProviders: [[$class: 'DeveloppersRecipientProvider'], [$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']]
        )
    }
}            
            
       
       
       
       
       
}
 